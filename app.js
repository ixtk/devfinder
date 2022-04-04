let userInfo;

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')

searchInput.onkeyup = e => {
  if (searchBtn.disabled && searchInput.value !== '')
    searchBtn.disabled = false
  else if (searchInput.value === '')
    searchBtn.disabled = true
}

document.querySelector('form').onsubmit = e => {
  e.preventDefault()
  if (searchInput.value === '') return
  getUserInfo(searchInput.value)
}

const fillData = json => {
  const joinTime = new Date(json.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  document.querySelector('.join-time').innerHTML = `Joined <time>${joinTime}</time>`

  const githubLink = document.querySelector('.user-link')
  githubLink.href = json.html_url
  githubLink.textContent = `@${json.login}`

  document.querySelector('.user-avatar').src = json.avatar_url
  document.querySelector('.username').textContent = json.login
  document.querySelector('.user-bio').textContent = json.bio || 'No bio'

  document.querySelector('.followers').textContent = json.followers
  document.querySelector('.following').textContent = json.following
  document.querySelector('.repos').textContent = json.public_repos
  
  document.querySelector('.company').textContent = json.company || 'No company'
  document.querySelector('.twitter').textContent = json.twitter_username || 'Not available'
  document.querySelector('.location').textContent = json.location || 'Not available'
  document.querySelector('.website').innerHTML = json.blog ? `<a href=${json.blog}>Website</a>` : 'No website'
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

getUserInfo('octocat')
