import * as React from 'react';
import { Text, View, StyleSheet ,Image} from 'react-native';
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
    }
  }


 componentDidMount() {
        const {quiz} = this.state;
        // this.fetchData();

        const listData = [];
        
        fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(res => {
            
          listData.push(res.results)
          this.setState({
            loading : false,
            quiz : listData
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
    console.log("quiz.lenght",quiz[0]);
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


  render() {
    const {loading,quiz} = this.state;
    console.log("Quiz Inside", quiz[0]);
    // console.log("quiz.lenght",quiz.length);

   
   
     const dispalyQuiz = quiz.lenght < 0 && 
      quiz[0].map(function(news, i){
      return(
        
        <View key={i}>
          <Text>{news.question}</Text>
          <View>
            {/* <Text>{news.text}</Text> */}
          </View>
        </View>
      );
    });

   

    return (
      <View style={styles.container}>
      
      {loading &&   <Image
    style={{height:200,width:200, margin : 60}} 
    source={{ uri: "https://thumbs.gfycat.com/LoathsomeVastBarnswallow-size_restricted.gif"}} /> 
     }
     {!loading && 
        <View>
          {dispalyQuiz}
        </View>}
      </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
