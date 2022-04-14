const qs = selector => {
  return document.querySelector(selector)
}

const searchBtn = qs('.search-btn')
const searchInput = qs('.search-input')

if (!localStorage.theme) {
  localStorage.theme = 'light'
} else if (localStorage.theme === 'dark') {
  document.documentElement.className = 'dark-theme'
}

searchInput.onkeyup = e => {
  if (searchBtn.disabled && searchInput.value !== '')
    searchBtn.disabled = false
  else if (searchInput.value === '')
    searchBtn.disabled = true
}

qs('.theme-btn').onclick = () => {
  if (localStorage.theme === 'light')
    localStorage.theme = 'dark'
  else 
    localStorage.theme = 'light'

  document.documentElement.classList.toggle('dark-theme')
  fillThemeBtn(localStorage.theme)
}

qs('form').onsubmit = e => {
  e.preventDefault()
  if (searchInput.value === '') return
  getUserInfo(searchInput.value)
}

const fillThemeBtn = theme => {
  if (theme === 'dark') {
    qs('.theme-mode-text').textContent = 'light'
    qs('.theme-mode-icon').src = './assets/icon-sun.svg'
    qs('.theme-mode-icon').alt = 'sun icon'
  } else {
    qs('.theme-mode-text').textContent = 'dark'
    qs('.theme-mode-icon').src = './assets/icon-moon.svg'
    qs('.theme-mode-icon').alt = 'moon icon'
  }
}

const fillData = json => {
  const joinTime = new Date(json.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  qs('.join-time').innerHTML = `Joined <time>${joinTime}</time>`

  const githubLink = qs('.user-link')
  githubLink.href = json.html_url
  githubLink.textContent = `@${json.login}`

  qs('.user-avatar').src = json.avatar_url
  qs('.username').textContent = json.login
  qs('.user-bio').textContent = json.bio || 'No bio'

  qs('.followers').textContent = json.followers
  qs('.following').textContent = json.following
  qs('.repos').textContent = json.public_repos
  
  qs('.company').textContent = json.company || 'No company'
  qs('.twitter').textContent = json.twitter_username || 'Not available'
  qs('.location').textContent = json.location || 'Not available'
  qs('.website').innerHTML = json.blog ? `<a href=${json.blog}>Website</a>` : 'No website'

  qs('li[data-item="location"]').className = json.location ? 'info-list-item' : 'info-item-dimmed'
  qs('li[data-item="website"]').className = json.blog ? 'info-list-item' : 'info-item-dimmed'
  qs('li[data-item="twitter"]').className = json.twitter_username ? 'info-list-item' : 'info-item-dimmed'
  qs('li[data-item="company"]').className = json.company ? 'info-list-item' : 'info-item-dimmed'
}

const getUserInfo = async username => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (response.status === 404) {
      console.log('User not found')
      return
    }
    jsonResponse = await response.json()
    fillData(jsonResponse)
  } catch (err) {
    console.error(err)
  }
}

fillThemeBtn(localStorage.theme)
getUserInfo('octocat')
