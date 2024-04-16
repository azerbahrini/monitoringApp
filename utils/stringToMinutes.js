module.exports =(input) => {
    let time;
    let mins ; 
  try {
      time = input.split(":");
      mins = Number(Number(time[0]*60) + Number(time[1]))
      return(mins)
  } catch (err) {
    console.log(err.message);
    return { err: err, status: "error" };
  }
};
