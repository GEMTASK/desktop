import { useEffect, useLayoutEffect, useState } from "react";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
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
  level = 0,
  children,
  selectedPath,
  onSelect
}: {
  name: string;
  path: string;
  level?: number;
  children: Branch[] | undefined;
  selectedPath: string;
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
        {children?.filter(file => file.type === "folder").map(folder => (
          <Folder
            key={folder.path}
            level={level + 1}
            name={folder.name}
            path={folder.path}
            children={folder.children}
            selectedPath={selectedPath}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}

function File({
  type,
  name,
  path,
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
  type: "file" | "folder";
  name: string;
  path: string;
  children: Branch[] | undefined;
};

//
// Explorer
//

function Explorer() {
  const [foldersData, setRootData] = useState<Branch[]>();
  const [filesData, setData] = useState<Branch[]>();
  const [selectedPath, setSelectedPath] = useState("");

  const handleItemSelect = (path: string) => {
    setSelectedPath(path);
  };

  useLayoutEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/",
        Prefix: selectedPath
      });

      const data = await client.send(command);

      const files = [
        ...data.CommonPrefixes?.map(({ Prefix }) => ({
          name: Prefix?.split("/").at(-2) as string,
          path: Prefix as string,
          type: "folder" as const,
          children: undefined
        })) ?? [],
        ...data.Contents?.filter(file => file.Key !== selectedPath)?.map(({ Key }) => ({
          name: Key?.split("/").at(-1) as string,
          path: Key as string,
          type: "file" as const,
          children: undefined
        })) ?? []
      ];

      setData(files);

      const updateItem = (children: Branch[] | undefined, selectedPath: string, files: Branch[]): Branch[] | undefined => {
        return children?.map(child => ({
          ...child,
          children: child.path === selectedPath && child.children === undefined
            ? files
            : updateItem(child.children, selectedPath, files)
        }));
      };

      // Merge / remove

      setRootData(foldersData => {
        const updatedData = selectedPath === "" && foldersData === undefined
          ? files
          : updateItem(foldersData, selectedPath, files);

        return updatedData;
      });
    })();
  }, [selectedPath]);

  return (
    <View style={{ width: 500, height: 400 }}>
      <View horizontal border="bottom" padding="16px" spacing="16px" fillColor="panel">
        <Button solid icon={HomeIcon} />
        <View spacing="8px">
          <Text light fontSize="12px" innerStyle={{ marginBottom: -6 }}>mike-austin.s3.amazonaws.com</Text>
          <Text>/{selectedPath}</Text>
        </View>
      </View>
      <View flex horizontal>
        <View padding="8px" style={{ width: 160 }}>
          {foldersData && (
            <Folder name="/" path="" children={foldersData} selectedPath={selectedPath} onSelect={handleItemSelect} />
          )}
        </View>
        <Divider />
        <View padding="8px">
          {filesData && (
            filesData.map(({ name, path, type }) => (
              <File key={path} type={type} name={name} path={name} />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

export default Explorer;
