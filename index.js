
import Head from "next/head";
import React from 'react';
import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { Configuration, OpenAIApi } from "openai";



export default function Home() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [result, setResult] = useState();

  async function onSubmit({ animal }) {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      console.log(data.result)

      setValue("animal", "");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            {...register("animal", { required: true })}
          />
          {errors.animal && <span>This field is required</span>}
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}


