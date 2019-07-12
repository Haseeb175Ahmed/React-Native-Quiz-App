import * as React from 'react';
import { Button,Text, View, StyleSheet ,Image,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';



// You can import from local files
// import Quiz from './components/Quiz';

// or any pure javascript modules available in npm


export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loading : true,
      quiz : [],
      question : null,
      correctAnswer : null,
      counter: 0,
      checked: 'first',

    }
  }


 componentDidMount() {
        const {quiz} = this.state;
        // this.fetchData();

        const listData = [];
        
        fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(res => {
            
          const {results} = res
                // console.log("message********",results)
                this.setState({
                  quiz: results,
                  loading : false
                })
        

        }).catch(e => {
            console.log("message", e);
            reject({
                message: "Error"
            })
        })

    }


   async fetchData() {
      

       
        this.setState({
            loading: true
        })

        try {
           

            const quiz = await Quiz();  //fetching police Data 
        console.log("QUIZ**********",quiz);

        } 
        catch (error) {
          console.log();
        }
        finally {

            this.setState({

                loading: false
            })

        }
   }

   Data() {
    const {quiz} = this.state;
    
    return quiz[0].map(function(news, i){
      return(
        
        <View key={i}>
          <Text>{news.question}</Text>
          <View>
            {/* <Text>{news.text}</Text> */}
          </View>
        </View>
      );
    });
  }

  incrementCounter(){
    this.setState({
        counter: this.state.counter + 1
    })
}


  render() {
    const {loading,quiz,counter,checked} = this.state;
    // console.log("Quiz Inside", quiz);
    // console.log("quiz.lenght",quiz.length);

    // const dispalyQuiz = quiz.length > 0 ? <View>
    //   <Text style={styles.titleText}>WelCome To Quiz App</Text>
    //   <Text>{counter+1 }<Text>)</Text>{quiz[counter].question}</Text>
    
    //   <Text>{quiz[counter].correct_answer}</Text>
    //   <Button color  ="blue"  title="Next" onPress={() => this.incrementCounter()}/>
    //  </View>: <Text>Loading</Text>
   
   
     const dispalyQuiz = quiz.length > 0 ? <View>
      <Text style={styles.titleText}>WelCome To Quiz App</Text>
        <View>
          {quiz.map((vale,index) => 
            {
           

              return(
                <View key = {index}>
                  <Text style={styles.paragraph} >{index+1}){vale.question}</Text>
                  {/* <Text>{vale.correct_answer}</Text> */}

                  <TouchableOpacity style={{flex: 0.1,alignSelf: 'flex-start',alignItems: 'left',borderWidth:5,backgroundColor:'purple'}}
                onPress={() => {
                  this.setState({
                    isCameraVisible : false
                  });
                }}>
                  <Text>HAseb</Text> 
                  </TouchableOpacity>

              </View>
             
              )
             
            })}
        </View>
      
        </View>: <Text>Loading</Text>
    
  // console.log("Counter **************",quiz[counter]);
   

    return (
      <View style={styles.container}>
      
      {loading &&   <Image
    style={{height:200,width:200, margin : 60}} 
    source={{ uri: "https://thumbs.gfycat.com/LoathsomeVastBarnswallow-size_restricted.gif"}} /> 
     }
     {!loading && 
        <View style={styles.container}>
          {dispalyQuiz}
        </View>}
      </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 11,
    fontSize: 18,
    
    
    
  },
  titleText: {
    fontSize:18,
    fontWeight: 'bold',
    color : 'red'
    
  },

  option: {
    fontSize:10,
    fontWeight: 'bold',
    marginLeft : 5,
    borderWidth : 5,    
  },
  
});
