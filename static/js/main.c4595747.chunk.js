(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{34:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var l=a(1),c=a(2),s=a.n(c),n=a(26),i=a.n(n),r=(a(34),a(11)),o=a(12),d=a(14),m=a(13),u=a(9),h=a(4),p=a(21);a(35);p.a.initializeApp({apiKey:"AIzaSyAkSHQyuR6FQ8FkN9atRMvF9Nhbba0B1os",authDomain:"reacttictactoe-69083.firebaseapp.com",databaseURL:"https://reacttictactoe-69083-default-rtdb.firebaseio.com",projectId:"reacttictactoe-69083",storageBucket:"reacttictactoe-69083.appspot.com",messagingSenderId:"705467616619",appId:"1:705467616619:web:d996b0ba5efecc294e102e"});var b=p.a,g=a.p+"static/media/gameMachineTwo.bd3743ca.png",O=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).onStart=function(t){t.preventDefault();var a=b.database().ref(),l=e.state,c={cellOne:l.cellOne,cellTwo:l.cellTwo,cellThree:l.cellThree,cellFour:l.cellFour,cellFive:l.cellFive,cellSix:l.cellSix,cellSeven:l.cellSeven,cellEight:l.cellEight,cellNine:l.cellNine,boardClass:l.boardClass,gameOutcome:l.gameOutcome,playerOneJoined:l.playerOneJoined,playerTwoJoined:l.playerTwoJoined},s=a.push(c).key;e.setState({key:s,toLobby:!0})},e.state={key:"",cellOne:"",cellTwo:"",cellThree:"",cellFour:"",cellFive:"",cellSix:"",cellSeven:"",cellEight:"",cellNine:"",boardClass:"x",gameOutcome:"",playerOneJoined:"",playerTwoJoined:"",toLobby:!1},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state.key;return!0===this.state.toLobby?Object(l.jsx)(h.a,{to:"/lobby/".concat(e)}):Object(l.jsxs)("main",{className:"mainPageContent wrapper home",children:[Object(l.jsxs)("div",{className:"homeLayout",children:[Object(l.jsx)("h1",{children:"TIC TAC TOE"}),Object(l.jsx)("p",{children:"Play Tic Tac Toe online in 3 simple steps"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"Start a game"}),Object(l.jsx)("li",{children:"Invite friends"}),Object(l.jsx)("li",{children:"Play!"})]}),Object(l.jsx)("form",{onSubmit:this.onStart,children:Object(l.jsx)("button",{type:"submit",className:"button",children:"start game"})})]}),Object(l.jsx)("div",{className:"homeImg img",children:Object(l.jsx)("img",{src:g,alt:"old school arcade machine, ready to play Tic Tac Toe"})})]})}}]),a}(c.Component),v=Object(h.f)(O),y=a.p+"static/media/gameController.efa36326.png",j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).copyLink=function(){var t=document.getElementById("gameUrl").textContent;window.navigator.clipboard.writeText(t),e.setState({linkCopied:!0}),setTimeout(e.removeMssg,1e3)},e.removeMssg=function(){e.setState({linkCopied:!1})},e.state={game:{},linkCopied:!1},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.gameKey;b.database().ref(t).on("value",(function(t){e.setState({game:t.val()})}))}},{key:"render",value:function(){var e=this.props.match.params.gameKey;return Object(l.jsxs)("div",{className:"mainPageContent gameLobby wrapper",children:[Object(l.jsx)("p",{className:"linkInstructions",children:"Here's your unique game link, send it to your opponent"}),Object(l.jsxs)("div",{className:"gameLinkDiv",children:[Object(l.jsx)("p",{id:"gameUrl",children:"https://armanaliani.github.io/reactGame/gameboard/".concat(e)}),Object(l.jsxs)("div",{children:[Object(l.jsx)("button",{onClick:this.copyLink,children:"Copy Link"}),Object(l.jsx)("p",{className:!0===this.state.linkCopied?"show copiedLink":"copiedLink",children:"Copied to Clipboard"})]})]}),Object(l.jsx)(u.b,{to:"/gameboard/".concat(e),className:"button",children:"Join Game"}),Object(l.jsx)("div",{className:"lobbyImg img",children:Object(l.jsx)("img",{src:y,alt:"A gaming controller"})})]})}}]),a}(c.Component),x=a(28),f=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).handleClick=function(t){var a=t.target,l=e.state,c=l.boardClass,s=t.target.className.split(" "),n=s.slice(1,2).toString();if(!s.includes("x")&&!s.includes("circle")){var i=function(e,t){e.classList.add(t)},r=e.props.match.params.gameKey,o=[l.cellOne,l.cellTwo,l.cellThree,l.cellFour,l.cellFive,l.cellSix,l.cellSeven,l.cellEight,l.cellNine,l.gameOver];o.includes("x")||o.includes("circle")||e.setStorage(r,"");var d=r,m=window.sessionStorage.getItem(d);if(""===l.playerOneJoined&&""===l.playerTwoJoined)"x"===l.boardClass&&(e.setStorage(r,"playerX"),e.updatePlayerStatus("playerOneJoined","yes"),e.setState({playerOneJoined:"yes"}),e.setStateClass(n),i(a,c),e.switchTurns(),e.setState({turnMssg:"waiting for opponent..."}));else if("yes"===l.playerOneJoined&&""===l.playerTwoJoined&&null===m)"circle"===l.boardClass&&(e.setStorage(r,"playerO"),e.updatePlayerStatus("playerTwoJoined","yes"),e.setState({playerTwoJoined:"yes"}),e.setStateClass(n),i(a,c),e.switchTurns(),e.setState({turnMssg:"waiting for opponent..."}));else if(l.playerOneJoined&&"yes"===l.playerTwoJoined)if("playerX"===m)"x"===l.boardClass&&(i(a,c),e.setStateClass(n),e.switchTurns(),e.setState({turnMssg:"waiting for opponent..."}));else if("playerO"===m)"circle"===l.boardClass&&(i(a,c),e.setStateClass(n),e.switchTurns(),e.setState({turnMssg:"waiting for opponent..."}));else if(null===m)return;e.checkWin(c)?(e.endGame(!1),e.setState({gameOutcome:c})):e.isDraw()&&(e.endGame(!0),e.setState({gameOutcome:"draw"}))}},e.switchTurns=function(){var t=e.state.boardClass;"x"===t?(e.setState({boardClass:"circle"}),e.updateBoardClass("boardClass")):"circle"===t&&(e.setState({boardClass:"x"}),e.updateBoardClass("boardClass"))},e.checkWin=function(e){var t=document.querySelectorAll("[data-cell]");return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some((function(a){return a.every((function(a){return t[a].classList.contains(e)}))}))},e.isDraw=function(){var e=document.querySelectorAll("[data-cell]");return Object(x.a)(e).every((function(e){return e.classList.contains("x")||e.classList.contains("circle")}))},e.endGame=function(t){var a=e.props.match.params.gameKey,l=e.state.boardClass,c=document.getElementById("winningMessage"),s=document.querySelector("[data-winning-message-text]");"x"===e.state.gameOutcome?(s.innerText="X's Win!",e.setState({gameOver:!0})):"circle"===e.state.gameOutcome?(s.innerText="O's Win!",e.setState({gameOver:!0})):t||"draw"===e.state.gameOutcome?(s.innerText="Draw!",""===e.state.gameOutcome&&e.setState({gameOutcome:"draw",gameOver:!0}),e.updateGameOutcome("draw")):"x"===l?(s.innerText="X's Win!",""===e.state.gameOutcome&&e.setState({gameOutcome:"x",gameOver:!0}),e.updateGameOutcome("x")):"circle"===l&&(s.innerText="O's Win!",""===e.state.gameOutcome&&e.setState({gameOutcome:"circle",gameOver:!0}),e.updateGameOutcome("circle")),c.classList.add("show"),function(e){window.sessionStorage.clear(e)}(a)},e.endGamePlayerTwo=function(t){var a=e.props.match.params.gameKey,l=document.getElementById("winningMessage"),c=document.querySelector("[data-winning-message-text]");"x"===e.state.gameOutcome?(c.innerText="X's Win!",e.setState({gameOver:!0})):"circle"===e.state.gameOutcome?(c.innerText="O's Win!",e.setState({gameOver:!0})):(t||"draw"===e.state.gameOutcome)&&(c.innerText="Draw!",""===e.state.gameOutcome&&e.setState({gameOutcome:"draw",gameOver:!0})),l.classList.add("show"),function(e){window.sessionStorage.clear(e)}(a)},e.handleRestart=function(){document.querySelectorAll("[data-cell]").forEach((function(e){e.classList.remove("x"),e.classList.remove("circle")})),document.getElementById("winningMessage").classList.remove("show"),e.setState({boardClass:"x",cellOne:"",cellTwo:"",cellThree:"",cellFour:"",cellFive:"",cellSix:"",cellSeven:"",cellEight:"",cellNine:"",gameOutcome:"",gameOver:!1,turnIndication:"its anyones move"}),e.updateNewGame()},e.handleRestartMessage=function(){""===e.state.gameOutcome&&document.getElementById("winningMessage").classList.remove("show")},e.updateNewGame=function(){var t=e.props.match.params.gameKey,a=b.database().ref("".concat(t,"/boardClass"));a.once("value",(function(e){e.val();a.set("x")})),[b.database().ref("".concat(t,"/cellOne")),b.database().ref("".concat(t,"/cellTwo")),b.database().ref("".concat(t,"/cellThree")),b.database().ref("".concat(t,"/cellFour")),b.database().ref("".concat(t,"/cellFive")),b.database().ref("".concat(t,"/cellSix")),b.database().ref("".concat(t,"/cellSeven")),b.database().ref("".concat(t,"/cellEight")),b.database().ref("".concat(t,"/cellNine")),b.database().ref("".concat(t,"/gameOutcome")),b.database().ref("".concat(t,"/playerOneJoined")),b.database().ref("".concat(t,"/playerTwoJoined"))].forEach((function(e){e.once("value",(function(t){t.val();e.set("")}))})),e.setState({turnMssg:"its anyones move"})},e.updateGameOutcome=function(t){var a=e.props.match.params.gameKey,l=b.database().ref("".concat(a,"/gameOutcome"));l.once("value",(function(e){var a=e.val();a=t,l.set(a)}))},e.updateCellData=function(t){var a=e.props.match.params.gameKey,l=b.database().ref("".concat(a,"/").concat(t)),c=e.state.boardClass;l.once("value",(function(e){var t=e.val();"x"===c?(t="x",l.set(t)):"circle"===c&&(t="circle",l.set(t))}))},e.updatePlayerStatus=function(t,a){var l=e.props.match.params.gameKey,c=b.database().ref("".concat(l,"/").concat(t));c.once("value",(function(e){var t=e.val();t=a,c.set(t)}))},e.updateBoardClass=function(t){var a=e.props.match.params.gameKey,l=b.database().ref("".concat(a,"/").concat(t)),c=e.state.boardClass;l.once("value",(function(e){var t=e.val();"x"===c?(t="circle",l.set(t)):"circle"===c&&(t="x",l.set(t))}))},e.state={game:{},cellOne:"",cellTwo:"",cellThree:"",cellFour:"",cellFive:"",cellSix:"",cellSeven:"",cellEight:"",cellNine:"",boardClass:"x",gameOutcome:"",playerOneJoined:"",playerTwoJoined:"",gameOver:!1,extraPlayer:!1,turnMssg:"its anyones move"},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.gameKey;b.database().ref(t).on("value",(function(a){e.setState({game:a.val(),cellOne:a.val().cellOne,cellTwo:a.val().cellTwo,cellThree:a.val().cellThree,cellFour:a.val().cellFour,cellFive:a.val().cellFive,cellSix:a.val().cellSix,cellSeven:a.val().cellSeven,cellEight:a.val().cellEight,cellNine:a.val().cellNine,boardClass:a.val().boardClass,gameOutcome:a.val().gameOutcome,playerOneJoined:a.val().playerOneJoined,playerTwoJoined:a.val().playerTwoJoined}),e.extraPlayer(t),e.checkWin(e.state.boardClass)?e.endGame(!1):e.isDraw()&&(e.endGamePlayerTwo(!0),e.setState({gameOutcome:"draw"})),e.handleRestartMessage(),e.turnIndication()}))}},{key:"setStateClass",value:function(e){var t=this.state.boardClass;"cellOne"===e?(this.setState({cellOne:t}),this.updateCellData("cellOne")):"cellTwo"===e?(this.setState({cellTwo:t}),this.updateCellData("cellTwo")):"cellThree"===e?(this.setState({cellThree:t}),this.updateCellData("cellThree")):"cellFour"===e?(this.setState({cellFour:t}),this.updateCellData("cellFour")):"cellFive"===e?(this.setState({cellFive:t}),this.updateCellData("cellFive")):"cellSix"===e?(this.setState({cellSix:t}),this.updateCellData("cellSix")):"cellSeven"===e?(this.setState({cellSeven:t}),this.updateCellData("cellSeven")):"cellEight"===e?(this.setState({cellEight:t}),this.updateCellData("cellEight")):"cellNine"===e&&(this.setState({cellNine:t}),this.updateCellData("cellNine"))}},{key:"setStorage",value:function(e,t){var a=e,l=[t];window.sessionStorage.setItem(a,l)}},{key:"extraPlayer",value:function(e){var t=this.state,a=e,l=this.state.boardClass,c=window.sessionStorage.getItem(a);"yes"===t.playerOneJoined&&"yes"===t.playerTwoJoined&&null===c&&(this.checkWin(l)||this.isDraw()||!1!==t.gameOver||(console.log("you who"),this.setState({extraPlayer:!0})))}},{key:"turnIndication",value:function(){var e=this.state,t=this.props.match.params.gameKey,a=this.state.boardClass,l=window.sessionStorage.getItem(t);if("playerX"===l&&"circle"===a)this.setState({turnMssg:"waiting for opponent..."});else if("playerO"===l&&"x"===a)this.setState({turnMssg:"waiting for opponent..."});else if(""===e.playerOneJoined&&""===e.playerTwoJoined)this.setState({turnMssg:"its anyones move"});else if("yes"===e.playerOneJoined&&""===e.playerTwoJoined)this.setState({turnMssg:"its your move player O"});else if("yes"===e.playerOneJoined&&"yes"===e.playerTwoJoined&&"playerX"===l&&"x"===a)this.setState({turnMssg:"its your move player X"});else{if("yes"!==e.playerOneJoined||"yes"!==e.playerTwoJoined||"playerO"!==l||"circle"!==a)return;this.setState({turnMssg:"its your move player O"})}}},{key:"render",value:function(){var e=this.props.match.params.gameKey,t=this.state.boardClass,a=this.state;return!0===a.extraPlayer?Object(l.jsx)(h.a,{to:"/"}):Object(l.jsxs)("main",{className:"mainPageContent wrapper gameBoard",children:[Object(l.jsx)("div",{className:"turnIndicatorMssg",id:"turnIndMssg",children:Object(l.jsx)("p",{children:a.turnMssg})}),Object(l.jsxs)("div",{className:"board ".concat(t),id:"board",children:[Object(l.jsx)("div",{className:"cell cellOne ".concat(a.cellOne),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellTwo ".concat(a.cellTwo),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellThree ".concat(a.cellThree),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellFour ".concat(a.cellFour),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellFive ".concat(a.cellFive),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellSix ".concat(a.cellSix),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellSeven ".concat(a.cellSeven),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellEight ".concat(a.cellEight),"data-cell":!0,onClick:this.handleClick}),Object(l.jsx)("div",{className:"cell cellNine ".concat(a.cellNine),"data-cell":!0,onClick:this.handleClick})]}),Object(l.jsxs)("div",{className:"winning-message",id:"winningMessage",children:[Object(l.jsx)("div",{"data-winning-message-text":!0}),Object(l.jsxs)("div",{className:"messageButtons",children:[Object(l.jsx)("button",{id:"restartButton button",onClick:this.handleRestart,children:"Restart"}),Object(l.jsx)(u.b,{to:"/",className:"newGame button",onClick:this.handleRestart,children:"New Game"})]})]}),Object(l.jsx)(u.b,{to:"/lobby/".concat(e),className:"button",children:"Back to Lobby"})]})}}]),a}(c.Component),S=function(){return Object(l.jsx)("header",{className:"wrapper",children:Object(l.jsx)("p",{children:Object(l.jsx)(u.b,{to:"/",tabIndex:"0",children:"Home"})})})},w=function(){return Object(l.jsx)("footer",{children:Object(l.jsxs)("div",{className:"wrapper",children:[Object(l.jsxs)("p",{children:["Created by ",Object(l.jsx)("a",{href:"https://alianicodes.com/",target:"_blank",rel:"noopener noreferrer",children:"Arman Aliani"})]}),Object(l.jsxs)("p",{children:["Images from ",Object(l.jsx)("a",{href:"https://undraw.co/",target:"_blank",rel:"noopener noreferrer",children:"unDraw"})]})]})})},C=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(l.jsx)(u.a,{basename:"/reactGame",children:Object(l.jsxs)(c.Fragment,{children:[Object(l.jsx)(S,{}),Object(l.jsx)(h.b,{exact:!0,path:"/",component:v}),Object(l.jsx)(h.b,{path:"/lobby/:gameKey",component:j}),Object(l.jsx)(h.b,{path:"/gameboard/:gameKey",component:f}),Object(l.jsx)(w,{})]})})}}]),a}(c.Component),T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,44)).then((function(t){var a=t.getCLS,l=t.getFID,c=t.getFCP,s=t.getLCP,n=t.getTTFB;a(e),l(e),c(e),s(e),n(e)}))};i.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(C,{})}),document.getElementById("root")),T()}},[[43,1,2]]]);
//# sourceMappingURL=main.c4595747.chunk.js.map