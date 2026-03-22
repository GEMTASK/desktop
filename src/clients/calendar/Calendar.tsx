import { View, Text, Button, Divider } from "onyx-ui";
import { useState } from "react";

// import { ReactComponent as ArrowLeftIcon } from "../../shared/images/arrow-left.svg";
// import { ReactComponent as ArrowRightIcon } from "../../shared/images/arrow-right.svg";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  return (
    <View flex>
      <View fillColor="panel" border="bottom">
        <View horizontal padding="16px" fillColor="panel" style={{ paddingBottom: 8 }}>
          <Text fontSize="24px">
            <Text fontWeight="700">{selectedDate.toLocaleDateString(undefined, { month: "long" })}</Text>{" "}
            <Text>{selectedDate.toLocaleDateString(undefined, { year: "numeric" })}</Text>
          </Text>
        </View>

        <View horizontal padding="8px">
          {Array.from({ length: 7 }, (_, index) => (
            <Text key={index} flex light fontSize="12px" fontWeight="600" style={{ textAlign: "right", paddingRight: 7 }}>
              {days[index]?.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>

      <View flex padding="8px" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {Array.from({ length: firstDayInMonth }, (_, index) => (
          <View key={-index} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index, today = index + 1 === selectedDate.getDate()) => (
          <View key={index + 1} cornerRadius="2px" padding="8px" fillColor={today && "primary"}>
            <Text style={{ textAlign: "right" }} textColor={today && "white"} fontWeight={today && "700"}>
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
