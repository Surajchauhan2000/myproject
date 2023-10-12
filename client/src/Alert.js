import React from 'react'

export default function Alert(props) {
  const capitalize=(word)=>{
    if(word==='danger'){
        word='error';
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (

    // remove all cls from the text Utils
       <div style={{height:'50px'}}>
       {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)} </strong>{props.alert.msg}
      </div>}
      </div>
  )
}

// manage cls(cummulative layout shift)
// when we click are goes or goes to light mode then it shift our page to bottom which is not happen so we shift it.