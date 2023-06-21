import React, { FC, HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// styles that will always be applied to this paragraph
const paragraphVariants = cva(
  'max-w-prose text-slate-700 dark:text-slate-300 text-center',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        sm: 'text-sm, sm:text-base'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

/**
 * Why extend the HTMLParagraph Element?
 *  Because we extended the html paragraph element. We can do auto complete for
 *  all the props available to the default html paragraph element
 * Why Extend VARIANTPROPS?
 *  To make the variant properties we defined in the "paragraphVariants" available to our component
 *  when we use it.
 * */
interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

/**
 * Wrapping the component with 'forwardRef' allows the component to take a "ref" properly which is a link
 * to a DOM node.
 */

/**
 * Format with forward ref and components in general
 * const componentName = fowardRef<PropTypeOne, PropTypeTwo...>(function);
 * function is equal to
 *  ({extracted properties, ref},) => { return html }
 */
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
  className, size, children, ...props
}, ref) => {
  return <p
  ref={ref}
  {...props}
  className={cn(paragraphVariants({size, className}))}>
    {children}
  </p>
});

Paragraph.displayName = 'Paragraph';

export default Paragraph;