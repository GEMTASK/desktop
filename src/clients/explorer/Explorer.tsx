import { useEffect, useState } from "react";
import { S3Client, ListBucketsCommand, ListObjectsV2Command, type ListObjectVersionsCommandOutput } from "@aws-sdk/client-s3";

import { Button, Divider, Icon, Text, View } from "../../shared/components";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATDBOG2D7WLWY5KE7",
    secretAccessKey: "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"
  }
});

function Folder({
  name,
  level = 0,
  children,
  onSelect
}: {
  name: string;
  level: number;
  children: Branch[];
  onSelect?: (path: string) => void;
}) {
  return (
    <View>
      <View horizontal spacing="4px" align="middle left" xstyle={{ paddingLeft: level * 8 }}>
        <Button flex hover icon={FolderIcon} padding="8px" align="middle left" style={{ paddingLeft: level * 8 + 16 }}>
          {/* <Icon icon={ChevronRightIcon} size={16} /> */}
          {name}
        </Button>
      </View>
      <View>
        {children.map(folder => (
          <Folder key={folder.name} level={level + 1} name={folder.name} children={[]} />
        ))}
      </View>
    </View>
  );
}

function File({ name, type }: { name: string; type: "file" | "folder" }) {
  return (
    <Button hover icon={type === "folder" ? FolderIcon : FileIcon} align="middle left">
      {name}
    </Button>
  );
}

type Leaf = {
  name: string;
};

type Branch = {
  name: string;
  children: (Branch | Leaf)[]
};

function Tree() {
  const data = useState<Branch[]>([
    {
      name: "Folder", children: [
        { name: "file" }
      ]
    }
  ]);
}

function Explorer() {
  const [data, setData] = useState<ListObjectVersionsCommandOutput>();
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/"
      });

      const data = await client.send(command);

      setData(data);

      console.log(">>>", data);
    })();
  }, []);

  return (
    <View style={{ width: 400 }}>
      <View horizontal>
        <View padding="8px">
          <Folder name="/" children={data?.CommonPrefixes?.map(prefix => ({ name: prefix.Prefix?.slice(0, -1) })) ?? []} />
        </View>
        <Divider />
        <View padding="8px">
          {data?.CommonPrefixes?.map(prefix => (
            <File key={prefix.Prefix} name={prefix.Prefix?.slice(0, -1)} type="folder" />
          ))}
          {data?.Contents.map(file => (
            <File key={file.Key} name={file.Key} type="file" />
          ))}
        </View>
      </View>
    </View>
  );
}

export default Explorer;
