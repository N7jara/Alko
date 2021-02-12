import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState('');
  const [bottles, setBottles] = useState(1);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);
  const [time, setTime] = useState(1);

  function calculate() {

    let result = 0;
    let liters = bottles * 0.33;
    let grams = liters * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * time;

    if (gender === 'male') {
      result = gramsLeft / (0.7 * weight);
    } else {
      result = gramsLeft / (0.6 * weight);
    }
    setPromilles(result);
  }



  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Enter weight"
          onChangeText={text => setWeight(text)}
        >
        </TextInput>
      </View>
      <View style={styles.field, { zIndex: 10 }}>
        <Text style={{ marginLeft: 10 }}>Bottles</Text>
        <DropDownPicker items={[
          { label: '1 bottles', value: 1 },
          { label: '2 bottles', value: 2 },
          { label: '3 bottles', value: 3 },
          { label: '4 bottles', value: 4 },
          { label: '5 bottles', value: 5 },
        ]}
          containerStyle={{ height: 40 }}
          defaultValue={bottles}
          onChangeItem={item => setBottles(item.value)}
          style={{ marginLeft: 10 }}
          labelStyle={{ color: '#000' }}
        >
        </DropDownPicker>
      </View>
      <View style={styles.field, { zIndex: 5 }}>
        <Text style={{ marginLeft: 10 }}>Time</Text>
        <DropDownPicker items={[
          { label: '1 hour', value: 1 },
          { label: '2 hour', value: 2 },
          { label: '3 hour', value: 3 },
          { label: '4 hour', value: 4 },
          { label: '5 hour', value: 5 },
        ]}
          containerStyle={{ height: 40 }}
          defaultValue={time}
          onChangeItem={item => setTime(item.value)}
          style={{ marginLeft: 10 }}
          labelStyle={{ color: '#000' }}
        >
        </DropDownPicker>
      </View>
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm
          radio_props={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
          onPress={(value) => { setGender(value) }}

        >
        </RadioForm>
      </View>
      <View style={styles.field}>
        <Text>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
        <Button onPress={calculate} title="Calculate"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    marginRight: 20,
  },
  input: {
    marginTop: 10,
  },
  field: {
    margin: 10,
  }
});
