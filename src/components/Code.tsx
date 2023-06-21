
'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import defaultProps, { Highlight, themes } from "prism-react-renderer";

interface CodeProps {
  code: string,
  show: boolean,
  language: any,
  animationDelay?: number,
  animated?: boolean
}

const Code: FC<CodeProps> = ({
  code,
  show,
  language,
  animationDelay,
  animated
}) => {
  const { theme: applicationTheme } = useTheme();
  // if animated, don't show the code right away.
  const [text, setText] = useState(animated? '': code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        // to clean up and prevent memory leak
        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]); // dependancy array => reruns the effect anytime any value in there changes

  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = (applicationTheme === 'light') ? themes.nightOwlLight : themes.nightOwl;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
    {({ className, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={
          className +
          'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'
        }
        style={{
          maxHeight: show ? lines * 24 : 0,
          opacity: show ? 1 : 0,
        }}>
        {tokens.map((line, i) => {
          // eslint-disable-next-line no-unused-vars
          const { key, ...rest } = getLineProps({ line, key: i })
          return (
            <div key={`line-${i}`} style={{ position: 'relative' }} {...rest}>
              {line.map((token, index) => {
                // eslint-disable-next-line no-unused-vars
                const { key, ...props } = getTokenProps({ token, i })
                return <span key={index} {...props} />
              })}
            </div>
          )
        })}
      </pre>
    )}
  </Highlight>
  )
}
export default Code;