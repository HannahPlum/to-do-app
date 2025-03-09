import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button, CheckBox } from 'react-native'; //this uses the built in checkbox, flatlist, safe area view, etc.. from react native

const App = () => {
  //these are the initial tasks that show on the homescreen, set to false to start
  const initialData = [
    { id: '1', description: 'Clean out car', completed: false },
    { id: '2', description: 'Wash dishes', completed: false },
  ];

  //this is the state for the tasks
  const [tasks, setTasks] = useState(initialData);

  //this is the state for the input box
  const [taskDescription, setTaskDescription] = useState('');

  //this function handles the task completion
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //this function handles adding a new task
  const addTask = () => {
    if (taskDescription.trim()) {
      const newTask = {
        id: (tasks.length + 1).toString(),
        description: taskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskDescription(''); //this clears the input field so a new task may be added
    }
  };

  //this is responsible for rendering each task
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed} //this determines if the checkbox is checked or unchecked
        onValueChange={() => toggleTaskCompletion(item.id)}
        color="#43503F"
      />
      <Text
        style={[
          styles.taskText,
          item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }, //this applies the required strikethrough styling once the task is complete
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
//this is my styling for the different elements in my app, matching the color scheme of my to do list wireframe, centering elements, changing font size and type, etc..
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
