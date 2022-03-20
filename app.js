let userInfo;

const getUserInfo = async () => {
  try {
    const response = await fetch('https://api.github.com/users/octocat')
    userInfo = await response.json()
    console.log(userInfo)
  } catch (err) {
    console.error(err)
  }
}
// getUserInfo()
