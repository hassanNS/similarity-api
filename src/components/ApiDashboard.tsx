import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from 'date-fns';
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Table from "@/components/Table";
import ApiKeyOptions from "./ApiKeyOptions";

// server component so we can request user data
const ApiDashboard= async ({}) => {
  const user = await getServerSession();
  if (!user) notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {userId: user.user.id}
  });

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) notFound();

  // get all the userRequests made by the user and all their previous apikeys
  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id)
      }
    }
  });

  // dates are not serializable so we can't pass them down to another component.
  // So we must make them serializable
  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date())
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading> Welcome back, {user.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your API Key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key}/>
        {/* revoke or create new */}
        <ApiKeyOptions apiKeyId={activeApiKey.id} apiKeyKey={activeApiKey.key}/>
      </div>
      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your Api History:
      </Paragraph>
      <Table userRequests={serializableRequests}/>
    </div>
  )
}

export default ApiDashboard;