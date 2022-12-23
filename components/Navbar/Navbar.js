import React, { useEffect } from "react";
import Link from 'next/link'
import { useProductContext } from "../context/ProductContext";
import styles from '../Navbar/Navbar.module.css'
import { useRouter } from "next/router"
import { getAuth } from 'firebase/auth'

export default function Navbar({ userUnregistered }) {
  const { numberOfItems, user } = useProductContext()
  const router = useRouter()


  return (
  <nav
    className={styles.navbar}
    role='navigation'
    aria-label='main navigation'
  >
    <div className={styles.navbarbrand}>
      <Link href="/">
        <b>eCommerce Paintings</b>
      </Link>
    </div>
    
    <div className={styles.navbarmenu}>
      
      <Link href="/" 
        className={
          router.pathname == "/" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
        Products
      </Link>

      <Link href="/cart" className={
          router.pathname == "/cart" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}
            id="cartnav">
        Cart ({ numberOfItems })
      </Link>

      <Link href="/about" className={
          router.pathname == "/about" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
        About
      </Link>

      {userUnregistered ? 
        <Link href="/user/login" className={
          router.pathname == "/user/login" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
          Login
        </Link>
        :
        <Link href="/user" className={
          router.pathname == "/user" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
          {user}
        </Link>
      }

    </div>
  </nav>
  )
}

export async function getServerSideProps() {
  const auth = getAuth()
  signInAnonymously(auth)
  const user = auth.currentUser
  const userUnregistered = !user.displayName
  return {
      props: {
          auth: auth,
          userUnregistered: userUnregistered
      }
  }
}

// If FS has enough data on Anon Auth, use that for conditional
// Otherwise, create a new collection where each doc has 
// the user token and the username. Then you just call SSR on
// Navbar, login.js, and user.js

// Navbar calls SSR -> creates User Token + checks for past username
// -> renders 'Login' or '{username}' Link on Navbar.
// On render, Navbar sets state in UserContext for 