import BodyClassName from 'react-body-classname'
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { IconCaretDown, IconGithub, IconSpring, IconTwitter } from '../icons'
import { Switch } from '../form'

class QuickLinks extends React.Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.state = {
      help: false,
      dark: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.setState({ dark: true })
    }
    try {
      if (localStorage.getItem('springtheme')) {
        this.setState({ dark: localStorage.getItem('springtheme') === 'dark' })
      }
    } catch (e) {}
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ help: false })
    }
  }

  toggleTheme = () => {
    try {
      localStorage.setItem('springtheme', this.state.dark ? 'light' : 'dark')
    } catch (e) {}
    this.setState({ dark: !this.state.dark })
  }

  render() {
    return (
      <>
        <BodyClassName className={this.state.dark ? 'dark' : 'light'} />
        <ul className='quick-links'>
          <li>
            <span className='switch-mode'>
              <Switch isOn={this.state.dark} onChange={this.toggleTheme} />
              {this.state.dark ? 'Dark' : 'Light'} UI
            </span>
          </li>
          <li>
            <a
              href='https://github.com/AxonFramework'
              rel='noreferrer noopener'
              target='_blank'
              tabIndex='-1'
            >
              <IconGithub />
              Github
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/axonframework'
              rel='noreferrer noopener'
              target='_blank'
              tabIndex='-1'
            >
              <IconTwitter />
              Twitter
            </a>
          </li>
          <li>
            <a
              href='/'
              className='dropdown'
              tabIndex='-1'
              onClick={e => {
                e.preventDefault()
                this.setState({ help: !this.state.help })
              }}
            >
              <IconSpring />
              Help
              <IconCaretDown className='caret' />
            </a>

            <TransitionGroup component={null}>
              {this.state.help && (
                <CSSTransition classNames='nav-anim' timeout={500}>
                  <ul className='dropdown-menu' ref={this.setWrapperRef}>
                    <li>
                      <a
                        id='ql-help-guides'
                        target='_blank'
                        rel='noopener noreferrer'
                        tabIndex='-1'
                        href='https://docs.axoniq.io/reference-guide/'
                        onClick={() => {
                          this.setState({ help: false })
                        }}
                      >
                        Axon Guides
                      </a>
                    </li>
                    <li>
                      <a
                        id='ql-help-spring-blog'
                        target='_blank'
                        rel='noopener noreferrer'
                        tabIndex='-1'
                        href='https://axoniq.io/blog-overview'
                        onClick={() => {
                          this.setState({ help: false })
                        }}
                      >
                        Axon Blog
                      </a>
                    </li>
                  </ul>
                </CSSTransition>
              )}
            </TransitionGroup>
          </li>
        </ul>
      </>
    )
  }
}

export default QuickLinks
