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
  selectedPath,
  level = 0,
  children,
  onSelect
}: {
  name: string;
  path: string;
  selectedPath: string;
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
        <Button flex hover icon={FolderIcon} selected={path === selectedPath} padding="8px" align="middle left" style={{ paddingLeft: level * 8 + 16 }}>
          {/* <Icon icon={ChevronRightIcon} size={16} /> */}
          {name}
        </Button>
      </View>
      <View>
        {children.map(folder => (
          <Folder key={folder.name} level={level + 1} name={folder.name.slice(0, -1)} path={`${path}${folder.name}`} selectedPath={selectedPath} children={[]} onSelect={onSelect} />
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
  type: "file" | "folder";
  children: Branch[];
};

function Tree() {
  const data = useState<Branch[]>([
    {
      name: "Folder", type: "folder", children: [
        { name: "file", type: "file", children: [] }
      ]
    }
  ]);
}

function Explorer() {
  const [data, setData] = useState<Branch[]>();
  const [rootData, setRootData] = useState<Branch[]>();
  const [selectedPath, setSelectedPath] = useState("");

  const handleItemSelect = (path: string) => {
    setSelectedPath(path);
  };

  useEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/"
      });

      const data = await client.send(command);

      setRootData(data?.CommonPrefixes?.map(prefix => ({ name: prefix.Prefix as string, type: "folder", children: [] })) ?? []);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/",
        Prefix: selectedPath
      });

      const data = await client.send(command);

      const files = [
        ...data.CommonPrefixes?.map(({ Prefix }) => ({
          name: Prefix?.split("/")[1] as string || Prefix?.split("/")[0] as string,
          type: "folder" as const,
          children: []
        })) ?? [],
        ...data?.Contents?.filter(file => file.Key !== selectedPath)?.map(({ Key }) => ({
          name: Key?.split("/")[1] as string || Key?.split("/")[0] as string,
          type: "file" as const,
          children: []
        })) ?? []
      ];

      setData(files);

      console.log(selectedPath);

      const recurse = (children: Branch[], path: string): Branch[] => {
        return children.map(child => ({
          ...child,
          children: recurse(child.children, path + child.name)
        }));
      };

      setRootData(rootData => {
        const updatedData = recurse(rootData ?? [], selectedPath);

        console.log(">>>", updatedData);

        return rootData;
      });

      // setRootData(rootData => [
      //   ...rootData ?? [],
      //   // rootData[""]
      // ]);
    })();
  }, [selectedPath]);

  if (!rootData) {
    return null;
  }

  return (
    <View style={{ width: 500, height: 300 }}>
      <View horizontal border="bottom" padding="16px" spacing="16px" fillColor="panel">
        <Button solid icon={HomeIcon} />
        <View spacing="8px">
          <Text light fontSize="12px" innerStyle={{ marginBottom: -6 }}>mike-austin.s3.amazonaws.com</Text>
          <Text>/{selectedPath}</Text>
        </View>
      </View>
      <View flex horizontal>
        <View padding="8px">
          <Folder name="/" path="" selectedPath={selectedPath} children={rootData} onSelect={handleItemSelect} />
        </View>
        <Divider />
        <View padding="8px">
          {data?.map(({ name, type }) => (
            <File key={name} name={name} type={type} path={name} />
          ))}
        </View>
      </View>
    </View>
  );
}

export default Explorer;
