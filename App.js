import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const [employee,setEmployee] = useState([])
  const [isAddEmployeeModalOpen,setIsAddEmployeeModalOpen] = useState(false)
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false)
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({})

  getData = () => {
    setErrorMessage('')
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {setEmployee(res);setLoading(false);setErrorMessage('')})
      .catch(() => {setLoading(false);setErrorMessage("Network Error. Please try again.")})
  }
  useEffect(() => {
    getData()
  },[])
  toggleAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(!isAddEmployeeModalOpen)
  }

  toggleEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(!isEditEmployeeModalOpen)
  }

  toggleDeleteEmployeeModal = () => {
    setIsDeleteEmployeeModalOpen(!isDeleteEmployeeModalOpen)
  }

  addEmployee = (data) => {
    // this.state.employee array is seprated into object by rest operator
    setEmployee([data,...employee])
  }

  updateEmployee = (data) => {
    // updating employee data with updated data if employee id is matched with updated data id
    setEmployee(employee.map(emp=>emp.id==data.id?data:emp))
  }

  deleteEmployee = employeeId => {
    // delete employee lsit with deleted data if employee id is matched with updated data id
    setEmployee(employee.filter(emp => emp.id!==employeeId))
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={toggleAddEmployeeModal}
          style={styles.button}>
          <Text style={styles.buttonText}>Add employee</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Employee Lists:</Text>
        {console.log(employee)}
        {employee.map((data, index) => <View
          style={styles.employeeListContainer}
          key={data.id}>
          <Text style={{ ...styles.listItem, color: "tomato" }}>{index + 1}.</Text>
          <Text style={styles.name}>{data.name}</Text>
          {/* <Text style={styles.listItem}>employee age: {data.employee_age}</Text> */}
          <Text style={styles.listItem}>employee username: {data.username}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                toggleEditEmployeeModal();
                setSelectedEmployee(data)
              }}
              style={{ ...styles.button, marginVertical: 0 }}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                toggleDeleteEmployeeModal();
                setSelectedEmployee(data)
              }}
              style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "red" }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>)}

        {loading ? <Text
          style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
            style={styles.message}>{errorMessage}</Text> : null}
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex:1
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "tomato",
    fontSize: 17
  }
})