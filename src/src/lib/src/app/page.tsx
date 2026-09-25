'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [customers, setCustomers] = useState<any[]>([])
  const [status, setStatus] = useState('Connecting to Supabase...')

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('customers').select('*')
      if (error) setStatus('Error: ' + error.message)
      else {
        setStatus('LINKED! Supabase is working')
        setCustomers(data || [])
      }
    }
    load()
  }, [])

  return (
    <div style={{padding: '40px', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>business-chat-hub</h1>
      <p style={{marginTop: '10px', background: '#eee', padding: '10px'}}>{status}</p>
      
      <h2 style={{marginTop: '30px', fontWeight: 'bold'}}>Customers ({customers.length})</h2>
      <ul>
        {customers.map(c => <li key={c.id}>{c.name} - {c.email}</li>)}
      </ul>
      <p style={{marginTop: '20px'}}>If you see LINKED, Step 5 is DONE!</p>
    </div>
  )
}
