import { BookIcon } from "lucide-react";
import { Icon, Text, View } from "onyx-ui";

function GEMTASK() {
  return (
    <View flex padding="16px" fillColor="gray-0">
      <View border cornerRadius="4px" style={{ overflow: "hidden" }}>
        <View padding="8px 16px" spacing="8px" fillColor="content">
          <Text fontWeight="600">
            An application can be filled out to become a Certified Scrum Trainer
          </Text>
          <View horizontal spacing="8px" align="middle left">
            <View horizontal spacing="4px" align="middle left">
              <Icon icon={BookIcon} size={14} style={{ marginTop: -4, marginBottom: -4 }} />
              <Text light fontSize="12px" fontWeight="600">
                ENG-2
              </Text>
            </View>
            <View>
              <Text fontSize="12px">
                Basic Authentication
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default GEMTASK;
