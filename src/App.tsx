import { FormEvent, useRef, useState } from "react";
import {FieldValues, useForm} from 'react-hook-form'
interface expenses_interface  {
  desc:string,
  amount:string,
  category:string
}

const App = () => {

  const {register,handleSubmit,formState:{errors},reset} = useForm()

  // const desc = useRef<HTMLInputElement>(null);
  // const amount = useRef<HTMLInputElement>(null);
  // const category = useRef<HTMLSelectElement>(null);

  const [expenses,setExpenses] = useState<expenses_interface[]>([{desc:'',amount:'0',category:''}])
  const [filter,setFilter] = useState('')

  const filtered_expenses = expenses.filter(item => filter?item.category==filter:item)

  const deleteExpense = (i:number) => {
    setExpenses(expenses.filter((_value,index)=>index!=i))
  }

  const formSubmit = (event:FieldValues) => {
    // event.preventDefault()
    // const expense = {desc:'',amount:'',category:''}
    // if(desc.current?.value) expense.desc = desc.current?.value
    // if(amount.current?.value) expense.amount = amount.current?.value
    // if(category.current?.value) expense.category = category.current?.value
    setExpenses([...expenses,{desc:event.desc,amount:event.amount,category:event.category}])
    reset()
  }

  return(
    <>
      <div className="col-12 d-flex align-items-center flex-column mt-4">
        <form action="" className="col-6" onSubmit={handleSubmit(formSubmit)}>
            <div className="my-3">
              <label htmlFor="desc" className="form-label">Description</label>
              <input {...register('desc',{required:true})} id='desc' type="text" className="form-control"/>
              {errors.desc?.type=='required' &&<p className="text-danger">description is required</p>}
            </div>
            <div className="my-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input {...register('amount',{required:true})} id='amount' type="number" className="form-control"/>
              {errors.amount?.type=='required' &&<p className="text-danger">amount is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="form-label">Category</label>
              <select {...register('category',{required:true})} className="form-select" aria-label="Default select example" id="category">
                <option value=''></option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              {errors.category?.type=='required' &&<p className="text-danger">category is required</p>}
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        <div className="col-6 mt-4">
            <select className="form-select" onChange={(event)=>setFilter(event.target?.value)}>
                <option value="">All category</option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
            </select>
          {filtered_expenses.length>0 && 
            <>
              <table className="mt-4 table table-bordered col-4">
                <thead>
                  <tr>
                    <th>description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered_expenses.map((item,index) =>
                      <tr key={index}>
                        <td>{item.desc}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        <td><button className="btn btn-outline-danger" onClick={()=>deleteExpense(index)}>Delete</button></td>
                      </tr>
                    )}
                    <tr>
                      <th>Total</th>
                      <th>{filtered_expenses.reduce((total,value)=>total+parseInt(value.amount),0)}</th>
                    </tr>
                </tbody>
              </table>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default App;