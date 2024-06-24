import { createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
   
    name:'counter',
    initialState:{
        value:0,
        mode:false
    },
    reducers:{
        incrementByAmount:(state,action)=>{state.value=action.payload},
        darkmode:(state,action)=>{state.mode=action.payload}
    },
})

export const {incrementByAmount,darkmode}=counterSlice.actions
export default  counterSlice.reducer