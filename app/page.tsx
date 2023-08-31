'use client';
import Image from "next/image";
import styles from "./page.module.css";

import { User } from "./types/user";
import Gallery from "./gallery";
import { useEffect, useState } from "react";

const USERS_ENDPOINT_URL = 'https://jsonplaceholder.typicode.com/users'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(USERS_ENDPOINT_URL)
        if (!response.ok) {
          throw new Error('Something went wrong...');
        }
        const responseData = await response.json()
        setUsers(responseData)
        setIsLoading(false)
      } catch (error) {
        setError(error as Error)
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <main className={styles.main}>
      {error && <p>{error.message}</p>}
      <Gallery users={users} isLoading={isLoading} />
    </main>
  );
}
