export const EXAMPLES = [
  {
    label: 'Python — Buggy Fibonacci',
    language: 'Python',
    code: `def fibonacci(n):
    if n == 0:
        return 0
    result = []
    a, b = 0, 1
    for i in range(n):
        result.append(a)
        a = b
        b = a + b  # Bug: a already changed
    password = "admin123"  # Security issue
    return result

print(fibonacci(10))
print(fibonacci(-5))  # No validation`
  },
  {
    label: 'JavaScript — Callback Hell + Memory Leak',
    language: 'JavaScript',
    code: `var data = []
function fetchUser(id, callback) {
    setTimeout(function() {
        var user = {id: id, name: "User" + id}
        data.push(user)  // Memory leak: array grows forever
        callback(user, function(user, callback2) {
            setTimeout(function() {
                callback2(user)
            }, 1000)
        })
    }, 1000)
}
fetchUser(1, function(user, next) {
    next(user, function(u) { console.log(u) })
})`
  },
  {
    label: 'SQL — Injection Vulnerability',
    language: 'SQL',
    code: `-- User login query
SELECT * FROM users
WHERE username = '" + username + "'
AND password = '" + password + "'

-- Also this gem:
SELECT * FROM orders WHERE id = $user_input`
  },
  {
    label: 'Java — Null Pointer Time Bomb',
    language: 'Java',
    code: `public class UserService {
    private static UserService instance;

    public static UserService getInstance() {
        return instance; // Never initialized
    }

    public String getUserName(int id) {
        User user = database.findUser(id);
        return user.getName().toUpperCase(); // NPE waiting
    }
}`
  },
  {
    label: 'C — Buffer Overflow',
    language: 'C',
    code: `#include <stdio.h>
#include <string.h>

void greet(char *name) {
    char buffer[10];
    strcpy(buffer, name); // No bounds check
    printf("Hello, %s!\\n", buffer);
}

int main() {
    char *username = "ThisNameIsWayTooLongForTheBuffer";
    greet(username);
    return 0;
}`
  }
]
