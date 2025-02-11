import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
} from "react-native-heroicons/solid";

const StudentsListCard = ({
  id,
  name,
  matric,
  status,
  classroom,
  tasmik,
  onPressAttendance,
}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);

  return (
    <View className="relative mt-2 flex-row">
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 border">
        <View>
          <Text
            numberOfLines={1}
            className="text-[#212529] font-bold text-lg w-48"
          >
            {name}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            {matric}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-[#212529] font-bold text-lg pr-2">
              Status:
            </Text>
            <Text className="text-[#6c757d] font-semibold text-base">
              {status}
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-3">
          {status !== "Attended" ? (
            <TouchableOpacity
              className="items-center"
              onPress={onPressAttendance}
            >
              <ClipboardDocumentCheckIcon size={25} color="#826aed" />
              <Text className="text-center text-[#6c757d] text-base">{`Mark \nAttendance`}</Text>
            </TouchableOpacity>
          ) : null}
          {status === "Attended" ? (
            <TouchableOpacity
              className="items-center"
              onPress={() => {
                navigation.navigate("TasmikGrading", {
                  classroom,
                  tasmik,
                  id,
                  name,
                  matric,
                });
              }}
            >
              <PencilSquareIcon size={25} color="#826aed" />
              <Text className="text-[#6c757d] text-base">Add Report</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default StudentsListCard;
