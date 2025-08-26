import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SearchScreen() {
  const [resources, setResources] = useState<any>([]);
  const [selectedResource, setSelectedResource] = useState<any>({});
  const [searchFields, setSearchFields] = useState<any>({});
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = "https://pk-mobile-backend.onrender.com";

  useEffect(() => {
    async function loadResourceField() {
      const response = await fetch(`${BASE_URL}/resources/all`);
      const data = await response.json();
      setSelectedResource(data[0]);
      setResources(data);
      console.log("Hello", data);
    }

    loadResourceField();
  }, []);

  const handleSearch = async () => {
    const response = await fetch(
      `${BASE_URL}/resources?resource=${selectedResource.value}&searchFields=${JSON.stringify(
        searchFields
      )}`
    );
    const data = await response.json();
    setResult(data);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedResource?.value}
        onValueChange={(val) =>
          setSelectedResource(resources.find((r: any) => r.value === val)!)
        }
        style={styles.picker}
      >
        <Picker.Item
          label={selectedResource?.value}
          value={selectedResource?.value}
          style={{ paddingVertical: 10 }}
        />
        {resources.map((r: any) => (
          <Picker.Item key={r.value} label={r.value} value={r.value} />
        ))}
      </Picker>

      {selectedResource && (
        <>
          <Text className="font-bold mt-4">Search</Text>
          {selectedResource?.schema?.search_fields?.map((field: any) => (
            <View className="py-3" key={field}>
              <TextInput
                placeholder={`Search by ${field}`}
                className="border p-2 my-1 rounded"
                onChangeText={(val) =>
                  setSearchFields({ ...searchFields, [field]: val })
                }
              />
            </View>
          ))}
        </>
      )}
      <TouchableOpacity
        disabled={loading}
        onPress={handleSearch}
        style={[styles.button, loading && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.text}>Search</Text>
        )}
      </TouchableOpacity>
      <ScrollView disableScrollViewPanResponder>
        {result !== "" && (
          <Text style={styles.resultText}>{JSON.stringify(result)}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  picker: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  fields: { marginTop: 10 },
  inputWrapper: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: "blue",
  },
  button: {
    backgroundColor: "#0000ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.7,
  },
});
