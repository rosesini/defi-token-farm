const MyToken = artifacts.require('MyToken')
const FarmToken = artifacts.require('FarmToken')

module.exports = async function (callback) {
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  const accounts = await web3.eth.getAccounts()

  // Returns the remaining number of tokens that spender will be allowed to spend
  // on behalf of owner through transferFrom
  const allowanceBefore = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    'Amount of MyToken FarmToken is allowed to transfer on our behalf Before: ' +
    allowanceBefore.toString()
  )

  // Allow the farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei('100', 'ether'))

  // Validate that farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    'Amount of MyToken FarmToken is allowed to transfer on our behalf After: ' +
    allowanceAfter.toString()
  )

  // Verify accounts[0] and the farmToken balance before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log('*** MyToken ***')
  console.log(
    'Balance MyToken Before accounts[0]: ' + web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    'Balance MyToken Before farmToken: ' + web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log('*** FarmToken ***')
  console.log(
    'Balance FarmToken Before accounts[0]: ' + web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    'Balance FarmToken Before farmToken: ' + web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call deposit from farmToken
  console.log('Call Deposit')
  await farmToken.deposit(web3.utils.toWei('100', 'ether'))

  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log('*** MyToken ***')
  console.log(
    'Balance MyToken After accounts[0]: ' + web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    'Balance MyToken After farmToken: ' + web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log('*** FarmToken ***')
  console.log(
    'Balance FarmToken After accounts[0]: ' + web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    'Balance FarmToken After farmToken: ' + web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  callback()
}