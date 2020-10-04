import * as React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";

export function DropDown({
  setSeconds,
  secondsMeditated,
}: {
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  secondsMeditated: number;
}) {
  return (
    <DropDownPicker
      items={[
        { label: "5 min", value: 5 * 60 },
        { label: "10 min", value: 10 * 60 },
        { label: "15 min", value: 15 * 60 },
        { label: "20 min", value: 20 * 60 },
      ]}
      defaultValue={15 * 60}
      containerStyle={{
        height: 40,
        width: 146,
        borderRadius: 200,
        marginVertical: 15,
      }}
      arrowColor={Colors.mauve}
      style={{
        backgroundColor: "#FBFBFC",
        shadowColor: "#8D8A8A",
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
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
      onChangeItem={(item: { value: number }) =>
        setSeconds(item.value - secondsMeditated)
      }
    />
  );
}
