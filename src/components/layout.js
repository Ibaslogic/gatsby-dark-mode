/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [darkMode, setDarkMode] = useState(getInitialMode())

  const theme = darkMode ? "dark-theme" : "light-theme"

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode))
  }, [darkMode])

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage // true/ false

    const savedMode = JSON.parse(localStorage.getItem("dark"))
    const userPrefersDark = getPreferredTheme()

    // returning visitor mode
    if (isReturningUser) {
      return savedMode
    } else if (userPrefersDark) {
      // Visitor preference
      return true
    } else {
      // Otherwise, light
      return false
    }
  }

  function getPreferredTheme() {
    const checkForDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    return checkForDark
  }

  const handleThemeClick = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <>
      <div className={theme}>
        <Header
          handleThemeClick={handleThemeClick}
          siteTitle={data.site.siteMetadata.title}
        />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          {/* <button onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
