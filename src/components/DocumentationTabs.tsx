'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import Code from '@/components/Code';
import { nodejs, python } from '@/helpers/documentation';
import SimpleBar from 'simplebar-react';

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs">
      <TabsList className="max-w-2xl w-full">
        <TabsTrigger value="nodejs">Node</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code animated language="javascript" code={nodejs} show/>
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code animated language="python" code={python} show/>
        </SimpleBar>
      </TabsContent>
    </Tabs>
  )
}
export default DocumentationTabs;