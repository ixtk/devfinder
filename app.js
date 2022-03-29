let userInfo;

document.querySelector('form').onsubmit = e => {
  // TODO validation
  e.preventDefault()
  const searchInput = document.querySelector('.search-input')
  getUserInfo(searchInput.value)
}

const fillData = json => {
  // TODO textContent vs other attrs
  document.querySelector('.user-avatar').src = json.avatar_url
  document.querySelector('.username').textContent = json.login
  document.querySelector('.user-link').innerHTML = `<a href=${json.html_url}>@${json.login}</a>`
  // TODO format date
  const joinTime = new Date(json.created_at).toLocaleDateString('en-US')
  document.querySelector('.join-time').innerHTML = `Joined at <time datetime="${joinTime}">${joinTime}</time>`

  document.querySelector('.user-bio').textContent = json.bio || 'No bio'

  document.querySelector('.followers').textContent = json.followers
  document.querySelector('.following').textContent = json.following
  document.querySelector('.repos').textContent = json.public_repos
  
  document.querySelector('.company').textContent = json.company || 'No company'
  document.querySelector('.twitter').textContent = json.twitter_username || 'Not available'
  document.querySelector('.location').textContent = json.location || 'Not available'
  document.querySelector('.blog').innerHTML = json.blog ? `<a href=${json.blog}>${json.blog}</a>` : 'No blog'
}

const getUserInfo = async username => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (response.status === 404) {
      console.log('Not found')
      return
    }
    jsonResponse = await response.json()

    // TODO handle errors
    fillData(jsonResponse)
  } catch (err) {
    console.error(err)
  }
}

getUserInfo('octocat')