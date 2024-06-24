import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from './TotalNote'
export default configureStore({
  reducer: {
    counter:counterReducer
  },
})  