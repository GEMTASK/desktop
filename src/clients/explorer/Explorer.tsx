import { useLayoutEffect, useState } from "react";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
  FileIcon, FolderIcon, HomeIcon, SquareIcon, ListIcon, TableIcon, LayoutGridIcon, LayoutListIcon, TextAlignJustifyIcon,
} from "lucide-react";

import { Button, Divider, Icon, Menu, Text, View } from "onyx-ui";

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATDBOG2D7WLWY5KE7",
    secretAccessKey: "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",
  },
});

function Folder({
  name,
  path,
  level = 0,
  children,
  selectedPath,
  onSelect,
}: {
  name: string,
  path: string,
  level?: number,
  children: Branch[] | undefined,
  selectedPath: string,
  onSelect?: (path: string) => void,
}) {
  const handleButtonClick = () => {
    onSelect?.(path);
  };

  return (
    <View>
      <View spacing="4px" onClick={handleButtonClick}>
        <Menu.Item hover icon={FolderIcon} title={name} selected={path === selectedPath} style={{ paddingLeft: level * 8 + 16 }} />
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
  detailsView,
  type,
  name,
  size,
  path,
}: {
  detailsView?: boolean,
  type: "file" | "folder",
  name: string,
  path: string,
  size: number,
}) {
  if (detailsView) {
    return (
      <Button hover icon={type === "folder" ? FolderIcon : FileIcon} padding="8px 12px" align="top left">
        <View spacing="8px">
          <Text style={{ textAlign: "left" }}>{name}</Text>
          <Text light fontSize="12px" style={{ textAlign: "left" }}>{size.toLocaleString()} Bytes</Text>
        </View>
      </Button>
    );
  }

  return (
    <Button hover icon={type === "folder" ? FolderIcon : FileIcon} padding="8px 12px" align="top left">
      {name}
    </Button>
  );
}

// type Leaf = {
//   name: string;
// };

type Branch = {
  type: "file" | "folder",
  name: string,
  path: string,
  size: number,
  children: Branch[] | undefined,
};

//
// List
//

function List({ items }: { items: Branch[] | undefined }) {
  return (
    <View padding="8px" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", alignItems: "flex-start", gridAutoRows: "min-content" }}>
      {items && (
        items.map(({ type, name, path, size }) => (
          <File key={path} type={type} name={name} path={name} size={size} />
        ))
      )}
    </View>
  );
}

function Details({ items }: { items: Branch[] | undefined }) {
  return (
    <View padding="8px" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", alignItems: "flex-start", gridAutoRows: "min-content" }}>
      {items && (
        items.map(({ type, name, path, size }) => (
          <File detailsView key={path} type={type} name={name} path={name} size={size} />
        ))
      )}
    </View>
  );
}

function Table({ items }: { items: Branch[] | undefined }) {
  return (
    <View>
      <View horizontal padding="16px" border="bottom" style={{ paddingBottom: 8 }}>
        <Text fontWeight="600" style={{ width: 200 + 32 }}>
          Name
        </Text>
        <Text fontWeight="600" style={{ width: 200 }}>
          Size
        </Text>
      </View>
      <View padding="8px 0px">
        {items?.map(({ type, name, path, size }) => (
          <Menu.Item key={path} icon={FolderIcon}>
            <Text style={{ width: 200, textAlign: "left" }}>
              {name}
            </Text>
            <Text style={{ width: 200, textAlign: "left" }}>
              {size.toLocaleString()} bytes
            </Text>
          </Menu.Item>
        ))}
      </View>
    </View>
  );
}

const Views = {
  Icon: List,
  List,
  Details,
  Table,
};

//
// Explorer
//

function Explorer() {
  const [foldersData, setRootData] = useState<Branch[]>();
  const [filesData, setData] = useState<Branch[]>();
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedView, setSelectedView] = useState<keyof typeof Views>("List");

  const handleItemSelect = (path: string) => {
    setSelectedPath(path);
  };

  useLayoutEffect(() => {
    (async () => {
      const command = new ListObjectsV2Command({
        Bucket: "mike-austin",
        Delimiter: "/",
        Prefix: selectedPath,
      });

      const data = await client.send(command);

      const files = [
        ...data.CommonPrefixes?.map(({ Prefix }) => ({
          type: "folder" as const,
          name: Prefix?.split("/").at(-2) as string,
          path: Prefix as string,
          size: 0,
          children: undefined,
        })) ?? [],
        ...data.Contents?.filter(file => file.Key !== selectedPath)?.map(({ Key, Size }) => ({
          type: "file" as const,
          name: Key?.split("/").at(-1) as string,
          path: Key as string,
          size: Size as number,
          children: undefined,
        })) ?? [],
      ];

      setData(files);

      const updateItem = (children: Branch[] | undefined, selectedPath: string, files: Branch[]): Branch[] | undefined => {
        return children?.map(child => ({
          ...child,
          children: child.path === selectedPath && child.children === undefined
            ? files
            : updateItem(child.children, selectedPath, files),
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

  const ViewComponent = Views[selectedView];

  return (
    <View flex>
      <View horizontal border="bottom" padding="8px" spacing="16px" fillColor="panel">
        <View flex align="left" fillColor="panel">
          <Button hover icon={HomeIcon} style={{ minWidth: 32, minHeight: 32 }} />
        </View>
        <View horizontal fillColor="panel">
          <Button hover icon={SquareIcon} solid={selectedView === "Icon"} onClick={() => setSelectedView("Icon")} style={{ minWidth: 32, minHeight: 32 }} />
          {/* <Button solid icon={LayoutGridIcon} style={{ minWidth: 32, minHeight: 32 }} /> */}
          {/* <Button solid icon={ListIcon} style={{ minWidth: 32, minHeight: 32 }} /> */}
          <Button hover icon={TextAlignJustifyIcon} solid={selectedView === "List"} onClick={() => setSelectedView("List")} style={{ minWidth: 32, minHeight: 32 }} />
          <Button hover icon={LayoutListIcon} solid={selectedView === "Details"} onClick={() => setSelectedView("Details")} style={{ minWidth: 32, minHeight: 32 }} />
          <Button hover icon={TableIcon} solid={selectedView === "Table"} onClick={() => setSelectedView("Table")} style={{ minWidth: 32, minHeight: 32 }} />
        </View>
        <View flex align="right" fillColor="panel">
          <Button hover icon={HomeIcon} style={{ minWidth: 32, minHeight: 32 }} />
        </View>
        {/* <View spacing="8px">
          <Text light fontSize="12px" innerStyle={{ marginBottom: -6 }}>mike-austin.s3.amazonaws.com</Text>
          <Text>/{selectedPath}</Text>
        </View> */}
      </View>
      <View flex horizontal>
        <View padding="8px 0px" style={{ width: 160 }}>
          {foldersData && (
            <Folder name="/" path="" children={foldersData} selectedPath={selectedPath} onSelect={handleItemSelect} />
          )}
        </View>
        <Divider />
        <View flex>
          <ViewComponent items={filesData} />
        </View>
      </View>
      <View border="top" padding="8px" fillColor="panel">
        <Text light fontSize="12px" innerStyle={{ marginBottom: -6 }}>
          mike-austin.s3.amazonaws.com/{selectedPath}
        </Text>
      </View>
    </View>
  );
}

export default Explorer;
