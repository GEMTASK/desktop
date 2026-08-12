import { useState } from "react";
import { Button, Icon, Menu, Text, View } from "onyx-ui";
import { BookmarkIcon, CalendarsIcon, HistoryIcon, HomeIcon, MenuIcon, PlusIcon } from "lucide-react";

import { Input } from "../terminal/Terminal";

function Browser({
  args,
}: {
  args?: Record<string, string>,
}) {
  const [url, setUrl] = useState(args?.url ?? "https://gemtask.github.io");

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setUrl((event.target as HTMLInputElement).value);
    }
  };

  return (
    <View flex horizontal>
      <View border="right" style={{ width: 256 }}>
        <View horizontal padding="8px" border="bottom" align="middle justify" fillColor="panel">
          <Button hover icon={MenuIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
          <View horizontal fillColor="panel">
            <Button hover icon={CalendarsIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
            <Button solid icon={BookmarkIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
            <Button hover icon={HistoryIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
          </View>
          <Button hover icon={PlusIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
        </View>
        <View padding="8px 0px">
          <Menu.Item icon={BookmarkIcon} title="GEMTASK – Agile, Simplified" />
        </View>
      </View>
      <View flex>
        <View horizontal border="bottom" padding="8px" spacing="8px" align="middle left" fillColor="panel">
          <Button hover icon={HomeIcon} style={{ minHeight: 32, padding: "8px 10px" }} />
          <Input flex border value={url} fillColor="content" cornerRadius="2px" style={{ minHeight: 32 }} onKeyDown={handleInputKeyDown} />
        </View>
        <View flex as="iframe" src={url} />
      </View>
    </View>
  );
}

export default Browser;
