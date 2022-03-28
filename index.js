import React from 'react';
import { render } from 'react-dom';
import {useEffect,useState} from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
  const MySwal = withReactContent(Swal)

class Cards extends React.Component {
  state = {
       show: false,
     };
  Reload= () => {
    window.location.reload();
  }
 toggleDeal_Higher= () => {
  this.score=Number(document.getElementById("ScoreId").innerText);
   var res = this.state.show;
   this.setState({ show: !res });
   // If Choosed Deal
   // -  If the user chose DEAL - the player WINS the game if the THIRD number is in-between the first two drawn numbers. Otherwise, the player LOSES. 
   if (this.state.random1 != this.state.random2)
   {  
      if (this.state.random1 <this.state.random3 && this.state.random2>this.state.random3 || this.state.random1>this.state.random3 && this.state.random2<this.state.random3)
      {
        MySwal.fire({
        title: <p></p>,
        didOpen: () => {
          MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>You Wins the game , third card is in-between the first two drawn cards.</p>)
           })
        this.score+=1;
      }
      else{
        MySwal.fire({
        title: <p></p>,
        didOpen: () => {
          MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>You loses.</p>)
           })
        this.score-=1;

      }
      };
  if (this.state.random1 == this.state.random2){
    // If Choosed Higher

    if (this.state.random3>this.state.random1){

      MySwal.fire({
        title: <p></p>,
        didOpen: () => {
          MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>You Wins the game as the third card is greater than the first two identical drawn cards.</p>)
           })
      this.score+=1;
    }
    else{
       MySwal.fire({
        title: <p></p>,
        didOpen: () => {
          MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>You loses.</p>)
           })
      this.score-=1;
    }

  }
   this.Update()

 }
 // 
 toggleNoDeal_Lower= () => {
   this.score=Number(document.getElementById("ScoreId").innerText);
   var res = this.state.show;
   this.setState({ show: !res });
   // If Choosed No Deal
   // (The two cards are NOT identical) 
   if (this.state.random1 != this.state.random2)
   {
    // - When the user chooses No Deal, deduct half points to the total score.
    if (this.score==0)
    {
      this.score=-0.5;
    }
    else{

      if (this.score<1){
      this.score=this.score+(this.score/2);

      }
      else{
        this.score=this.score-(this.score/2);

      }

    }
    MySwal.fire({
  title: <p></p>,
  didOpen: () => {
    MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>No Deal,Half points deduted.</p>)
    })
    

    }
   if (this.state.random1 == this.state.random2){
      // If Choosed LOWER
      if (this.state.random1 >this.state.random3)
        {
      MySwal.fire({
  title: <p></p>,
  didOpen: () => {
    MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>You WINS the game,THIRD card is lower than the first two identical drawn cards.</p>)
    })
    
      this.score+=1;
      }
      else{
         MySwal.fire({
        title: <p></p>,
        didOpen: () => {
          MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>You loses.</p>)
           })
        this.score-=1;
      }

   }
   this.Update()
 };

  Update = () => {
    document.getElementById("ScoreId").innerText=this.score
    document.getElementById("next_round_anchortag").innerText="Next Round"
    document.getElementById("btn_1").setAttribute("disabled","disabled")
    document.getElementById("btn_2").setAttribute("disabled","disabled")
    if (parseInt(document.getElementById("roundsid").innerText)==5)
    {
      document.getElementById("next_round_p").innerText="Game Over";

    }
       }
  NextRound  = () => {
    var res = this.state.show;
    this.setState({ show: !res });
    document.getElementById("next_round_anchortag").innerText=""
    document.getElementById("btn_1").removeAttribute("disabled")
    document.getElementById("btn_2").removeAttribute("disabled")

    if (parseInt(document.getElementById("roundsid").innerText)==4)
    {
      document.getElementById("next_round_anchortag").innerText="Last Round";

    }
    if (parseInt(document.getElementById("roundsid").innerText)==5)
    {
       MySwal.fire({
  title: <p></p>,
  didOpen: () => {
    MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>Game Over...!!!!</p>)
    })
    
    document.getElementById("btn_1").setAttribute("disabled","disabled");
    document.getElementById("btn_2").setAttribute("disabled","disabled");
    document.getElementById("next_round_p").innerText="Game Over";

    }
    else{
      this.UpdateRandomNumber() 
      document.getElementById("roundsid").innerText=parseInt(document.getElementById("roundsid").innerText)+1;
      document.getElementById("random_card_1").innerText=this.state.random1;
      document.getElementById("random_card_2").innerText=this.state.random2;
      document.getElementById("random_card_3").innerText=this.state.random3;



      // Update Random Number
    }

}
  constructor(props) {
        super(props);
        this.state = {
          random1 : 0,
          random2 : 0,
          random3 : 0,
          score : 0,
          rounds : 1,
          deal_higher_btn : "Deal",
          nodeal_lower_btn : "No Deal",
          next_round : "Next Round"
        }
      }
    UpdateRandomNumber(){
      const min = 1;
      const max = 13;
      var rand1 = Math.floor(Math.random() * 13)+1;
      var rand2 = Math.floor(Math.random() * 13)+1;
      var rand3= Math.floor(Math.random() * 13)+1; 

      if ( rand1== rand2)
      {
        this.deal_higher_btn= "Higher";
        this.nodeal_lower_btn="Lower";
      }
      if ( rand1!= rand2)
      {
        this.deal_higher_btn= "Deal";
        this.nodeal_lower_btn="No Deal";
      }     
      this.setState({ random1: rand1  });
      this.setState({ random2: rand2 });
      this.setState({ random3: rand3 });
      
    }
  
    componentDidMount() {
      this.UpdateRandomNumber()
      this.setState({ next_round: 'Next Round'});

      
    }

    handleClick = () => {
      console.log('handleClick');
      // const min = 1;
      // const max = 13;
      // const rand = Math.floor(min + Math.random() * (max - min));
      // this.setState({ random: this.state.random + rand });

    };
  render() {
        return (
          <section>
          
          <div id="container_div">
            <div>
              <div className="grid-container-button">
                <div className="grid-item-button">
                 <button id="btn_1" className="button button1" onClick={ this.toggleDeal_Higher }>{this.deal_higher_btn}</button>
                
                </div>
              </div>
              <div className="grid-container-button">
                <div className="grid-item-button">
                 <button id="btn_2" className="button button2" onClick={ this.toggleNoDeal_Lower } >{this.nodeal_lower_btn}</button>
                </div>
              </div>
              
            </div>
            
            <div>
              <p >Scores:<b id="ScoreId">{this.state.score}</b></p>
              <p >Rounds:<b id="roundsid">{this.state.rounds}</b></p>

            </div>
            <div>
             <b onClick={this.Reload}>Restart</b>
              <p id="next_round_p" className="next_round"><b><a className="next_round" id="next_round_anchortag" onClick={ this.NextRound } ></a></b> </p>

             

            </div>
            </div>
            <div class="grid-container" id='all_cards'>
              <div class="grid-item">
                <div class="card card1 " id="card1Id">
                    <img className="cardsImg" />
                    <div class="container"  id="container">
                      <h4 id="random_1" class="random_numer"><b id="random_card_1">{this.state.random1}</b></h4> 
                      <p>1st Card</p> 
                    </div>
                  </div>
              </div>
              <div class="grid-item">
                <div class="card card1 " id="card1Id">
                    <img className="cardsImg" />
                    <div class="container"  id="container">
                      <h4 id="random_2" class="random_numer"><b id="random_card_2">{this.state.random2}</b></h4> 
                      <p>2nd Card</p> 
                    </div>
                  </div>
              </div>
              {
    this.state.show ? (
              <div class="grid-item">
                <div class="card card1 " id="card1Id">
                    <img className="cardsImg" />
                    <div class="container"  id="container">
                      <h4 id="random_3" class="random_numer"><b id="random_card_3">{this.state.random3}</b></h4> 
                      <p>3rd Card</p> 
                    </div>
                  </div>
              </div>) : null
  }
              

            </div>
           </section>

                );
      }
    }


render(<Cards />, document.getElementById('main'));




