import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      resultTxt:"",
      calcTxt:""
    };
    this.operations = ["DEL","+","-","*","/"];
  }
  validateText(){
    const text = this.state.resultTxt;
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }
  calculateResult(){
    const text = this.state.resultTxt;
    this.setState({
      calcTxt:eval(text)
    })
  }
  buttonPressed(text){
    // console.log(text);
    if(text == "="){
      return this.validateText() && this.calculateResult()
    }
    this.setState({
      resultTxt:this.state.resultTxt + text
    })
  }
  operate(op){
    debugger;
    switch(op){
      case "DEL":
        var text = this.state.resultTxt.split('');
        text.pop();

        this.setState({
          resultTxt:text.join('')
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
          const lastChar = this.state.resultTxt.split('').pop();
          if(this.operations.indexOf(lastChar) > 0 ){
            var text = this.state.resultTxt.split('');
            text.pop();
            text.push(op);
            this.setState({
              resultTxt: text.join('')
            })
            return;
          };
          if(this.state.resultTxt == "") return;

          this.setState({
            resultTxt: this.state.resultTxt + op
          })
    }
  }
  render(){
    let rows = [];
    let nums = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [".",0,"="]
    ];
    for(let i = 0; i < 4; i++){
      let row = [];
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.btnTxt}>{nums[i][j]}</Text></TouchableOpacity>);
      }
      rows.push(<View style={styles.rows}>{row}</View>);
    }


    let ops =[];
    for(let i = 0; i < 5; i++){
      ops.push(<TouchableOpacity onPress={() => this.operate(this.operations[i])} style={styles.btn}><Text style={styles.btnTxt, styles.white}>{this.operations[i]}</Text></TouchableOpacity>);
    }
    return (
      <View style={styles.container}>
      <StatusBar hidden={true}/>
        <View style={styles.result}>
          <Text style={styles.calculationText}>{this.state.resultTxt}</Text>

        </View>
        <View style={styles.calculation}>
          <Text style={styles.resultText}>{this.state.calcTxt}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText:{
    fontSize:14,
    color:'white'
  },
  calculationText:{
    fontSize:30,
    color:'white'
  },
  rows:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  btn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'stretch'
  },
  btnTxt:{
    fontSize:30
  },
  white:{
    fontSize:30,
    color:'white'
  },
  result:{
    flex:2,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  calculation:{
    flex:1,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  buttons:{
    flex:7,
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'yellow'
  },
  operations:{
    flex:1,
    justifyContent:'space-around',
    backgroundColor:'black'
  }
});
