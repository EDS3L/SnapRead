class UserService {
  getUsernameFromToken(token) {
    const tokenPayload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(tokenPayload));
    return decodedPayload.sub;
  }
}

export default UserService;
