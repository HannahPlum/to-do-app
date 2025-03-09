import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button, CheckBox } from 'react-native'; // Using the built-in CheckBox from React Native

const App = () => {
  // Initial task data
  const initialData = [
    { id: '1', description: 'Clean out car', completed: false },
    { id: '2', description: 'Wash dishes', completed: false },
  ];

  // State to hold tasks
  const [tasks, setTasks] = useState(initialData);

  // State for the input box
  const [taskDescription, setTaskDescription] = useState('');

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to add a new task
  const addTask = () => {
    if (taskDescription.trim()) {
      const newTask = {
        id: (tasks.length + 1).toString(),
        description: taskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskDescription(''); // Clear input field
    }
  };

  // Render each task
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed} // The value of the checkbox (checked or unchecked)
        onValueChange={() => toggleTaskCompletion(item.id)} // Toggle the completion status
        color="#43503F"
      />
      <Text
        style={[
          styles.taskText,
          item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }, // Apply strikethrough if completed
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View >
        <Text style={styles.header}>MyTasks</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add your task:"
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
        <View style={styles.addButton}>
          <Button title="Add" onPress={addTask}
            color='#43503F'
          /></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },

  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFCE6B',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#43503F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    marginRight: 10,
    marginLeft: 20,
    flex: 1,
    padding: 10,
    backgroundColor: '#FFCE6B',
    color: '#43503F',
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',

  },

  addButton: {
    width: 80,
    height: 45,
    marginRight: 20,
    backgroundColor: '#43503F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#43503F',
    textAlign: 'center',
    fontSize: 40,
    color: '#FFFCF3',
    padding: 20,
  },
});

export default App;
