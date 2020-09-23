import * as React from "react";
import DropDownPicker from "react-native-dropdown-picker";

export function DropDown({
  setSeconds,
}: {
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <DropDownPicker
      items={[
        { label: "15 min", value: 15 * 60 },
        { label: "30 min", value: 30 * 60 },
        { label: "60 min", value: 60 * 60 },
      ]}
      defaultValue={15 * 60}
      containerStyle={{
        height: 40,
        width: 146,
        borderRadius: 200,
        marginVertical: 15,
      }}
      style={{
        backgroundColor: "#FBFBFC",
        shadowColor: "#8D8A8A",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={{ backgroundColor: "#FBFBFC" }}
      onChangeItem={(item: { value: number }) => setSeconds(item.value)}
    />
  );
}
