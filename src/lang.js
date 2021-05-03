/*
 * @Author: Libra
 * @Date: 2021-04-30 16:28:44
 * @LastEditTime: 2021-04-30 16:28:45
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /interview-vue/src/lang.js
 */
const c_template = `#include <stdio.h>
int main(void) {
  char name[10];
  scanf("%s", name);
  printf("hello, %s", name);
  return 0;
}`

const cpp_template = `#include <iostream>
int main()
{
    std::string hello_str;
    std::cin >> hello_str;
    std::cout << "hello " << hello_str;
}`

const java_template = `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
        String sWhatever;
        Scanner scanIn = new Scanner(System.in);
        sWhatever = scanIn.nextLine();
        scanIn.close();            
        System.out.println("hello " + sWhatever);
  }
}
`

const python_template = `import sys
input = sys.stdin.read()
print("hello " + input);
`

const js_template = `process.openStdin().on ('data', function (line) {
  console.log('hello ' + String(line));
  process.exit();
}
)
`

module.exports = [
  {
    'languageId': 63,
    'language': 'javascript',
    'sdk': 'Node.js 12.14.0',
    'template': js_template
  },
  {
    'languageId': 75,
    'language': 'c',
    'sdk': 'Clang 7.0.1',
    'template': c_template
  },
  // {
  //   "languageId": 5,
  //   "language": "c",
  //   "sdk": "GCC 7.4.0"
  // },
  // {
  //   "languageId": 6,
  //   "language": "c",
  //   "sdk": "GCC 8.3.0"
  // },
  // {
  //   "languageId": 7,
  //   "language": "c",
  //   "sdk": "GCC 9.2.0"
  // },
  {
    'languageId': 76,
    'language': 'cpp',
    'sdk': 'Clang 7.0.1',
    'template': cpp_template
  },
  // {
  //   "languageId": 10,
  //   "language": "c++",
  //   "sdk": "GCC 7.4.0"
  // },
  // {
  //   "languageId": 11,
  //   "language": "c",
  //   "sdk": "GCC 8.3.0"
  // },
  // {
  //   "languageId": 12,
  //   "language": "c",
  //   "sdk": "GCC 9.2.0"
  // },
  {
    'languageId': 62,
    'language': 'java',
    'sdk': 'OpenJDK 13.0.1',
    'template': java_template
  },
  {
    'languageId': 70,
    'language': 'python',
    'sdk': 'Python 2.7.17',
    'template': python_template
  },
  {
    'languageId': 71,
    'language': 'python',
    'sdk': 'Python 3.8.1',
    'template': python_template
  }
]

