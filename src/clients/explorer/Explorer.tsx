import { useEffect, useState } from "react";
import { S3Client, ListObjectsV2Command, type ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { ChevronRightIcon, FileIcon, FolderIcon, HomeIcon } from "lucide-react";

import { Button, Divider, Icon, Text, View } from "../../shared/components";

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATDBOG2D7WLWY5KE7",
    secretAccessKey: "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"
  }
});

function Folder({
  name,
  path,
  selectedItemPath,
  level = 0,
  children,
  onSelect
}: {
  name: string;
  path: string;
  selectedItemPath: string;
  level?: number;
  children: Branch[];
  onSelect?: (path: string) => void;
}) {
  const handleButtonClick = () => {
    onSelect?.(path);
  };

  return (
    <View>
      <View horizontal spacing="4px" align="middle left" onClick={handleButtonClick} xstyle={{ paddingLeft: level * 8 }}>
        <Button flex hover icon={FolderIcon} selected={path === selectedItemPath} padding="8px" align="middle left" style={{ paddingLeft: level * 8 + 16 }}>
          {/* <Icon icon={ChevronRightIcon} size={16} /> */}
          {name}
        </Button>
      </View>
      <View>
        {children.map(folder => (
          <Folder key={folder.name} level={level + 1} name={folder.name.slice(0, -1)} path={`${path}${folder.name}`} selectedItemPath={selectedItemPath} children={[]} onSelect={onSelect} />
        ))}
      </View>
    </View>
  );
}

function File({
  name,
  path,
  type
}: {
  name: string;
  path: string;
  type: "file" | "folder";
}) {
  return (
    <Button hover icon={type === "folder" ? FolderIcon : FileIcon} align="middle left">
      {name}
    </Button>
  );
}

// type Leaf = {
//   name: string;
// };

type Branch = {
  name: string;
  children: Branch[];
};

function Tree() {
  const data = useState<Branch[]>([
    {
      name: "Folder", children: [
        { name: "file", children: [] }
      ]
    }
  ]);
}

function Explorer() {
  const [data, setData] = useState<ListObjectsV2CommandOutput>();
  const [rootData, setRootData] = useState<ListObjectsV2CommandOutput>();
  const [selectedItemPath, setSelectedItemPath] = useState("");

  const handleItemSelect = (path: string) => {
    console.log(path);

    setSelectedItemPath(path);
  };

  useEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/"
      });

      const data = await client.send(command);

      setRootData(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/",
        Prefix: selectedItemPath
      });

      const data = await client.send(command);

      setData(data);
    })();
  }, [selectedItemPath]);

  return (
    <View style={{ width: 500, height: 300 }}>
      <View horizontal border="bottom" padding="16px" spacing="16px" fillColor="panel">
        <Button solid icon={HomeIcon} />
        <View spacing="8px">
          <Text light fontSize="12px" innerStyle={{ marginBottom: -6 }}>mike-austin.s3.amazonaws.com</Text>
          <Text>/{selectedItemPath}</Text>
        </View>
      </View>
      <View flex horizontal>
        <View padding="8px">
          <Folder
            name="/"
            path=""
            selectedItemPath={selectedItemPath}
            children={rootData?.CommonPrefixes?.map(prefix => ({ name: prefix.Prefix as string, children: [] })) ?? []}
            onSelect={handleItemSelect}
          />
        </View>
        <Divider />
        <View padding="8px">
          {data?.CommonPrefixes?.map(file => (
            <File key={file.Prefix} name={file.Prefix?.split("/")[1] as string || file.Prefix?.split("/")[0] as string} type="folder" path={file.Prefix as string} />
          ))}
          {data?.Contents?.filter(file => file.Key !== selectedItemPath)?.map(file => (
            <File key={file.Key} type="file" name={file.Key?.split("/")[1] as string || file.Key?.split("/")[0] as string} path={file.Key as string} />
          ))}
        </View>
      </View>
    </View>
  );
}

export default Explorer;
