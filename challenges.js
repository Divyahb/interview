// generate-challenges.js
const fs = require("fs");
const challenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["HashMap", "Array"],
    companies: ["Amazon", "Uber"],
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use a hash map to store each number’s index. For each element, check if its complement (target−num) exists in the map.",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    description:
      "Add two numbers represented by linked lists and return the sum as a linked list.",
    tags: ["Linked List", "Math"],
    companies: ["Google", "Facebook"],
    code: `function addTwoNumbers(l1, l2) {
  let carry = 0, dummy = new ListNode(0), p = dummy;
  while (l1 || l2 || carry) {
    const sum = (l1?.val||0) + (l2?.val||0) + carry;
    carry = Math.floor(sum/10);
    p.next = new ListNode(sum % 10);
    p = p.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  return dummy.next;
}`,
    complexity: `// Time: O(max(m, n))
// Space: O(max(m, n))`,
    explanation:
      "Traverse both lists, sum corresponding digits + carry, build new nodes, propagate carry.",
    link: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description:
      "Return the length of the longest substring without repeating characters.",
    tags: ["Sliding Window", "HashSet"],
    companies: ["Netflix", "Adobe"],
    code: `function lengthOfLongestSubstring(s) {
  let set = new Set(), left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    complexity: `// Time: O(n)
// Space: O(min(n, m))`,
    explanation:
      "Use a sliding window and a set to maintain unique characters, expand right and contract left on duplicates.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    description:
      "Find the median of two sorted arrays of sizes m and n in O(log(m+n)) time.",
    tags: ["Binary Search", "Divide and Conquer"],
    companies: ["Google", "Bloomberg"],
    code: `function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  let m = a.length, n = b.length, low = 0, high = m;
  while (low <= high) {
    const i = (low + high) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    if (i < m && b[j-1] > a[i]) low = i + 1;
    else if (i > 0 && a[i-1] > b[j]) high = i - 1;
    else {
      const maxLeft = i === 0 ? b[j-1] : j === 0 ? a[i-1] : Math.max(a[i-1], b[j-1]);
      if ((m + n) % 2) return maxLeft;
      const minRight = i === m ? b[j] : j === n ? a[i] : Math.min(a[i], b[j]);
      return (maxLeft + minRight) / 2;
    }
  }
}`,
    complexity: `// Time: O(log(min(m,n)))
// Space: O(1)`,
    explanation:
      "Binary search partition on the smaller array to split left/right halves equally, compute median from edge values.",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    tags: ["Expand Around Center", "Palindrome"],
    companies: ["Booking.com", "GetYourGuide"],
    code: `function longestPalindrome(s) {
  if (!s) return '';
  let [start, end] = [0, 0];
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return r - l - 1;
  }
  for (let i = 0; i < s.length; i++) {
    const len1 = expand(i, i), len2 = expand(i, i+1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len-1)/2);
      end = i + Math.floor(len/2);
    }
  }
  return s.slice(start, end+1);
}`,
    complexity: `// Time: O(n^2)
// Space: O(1)`,
    explanation:
      "Expand around each center (odd and even) to find max palindrome, track global start/end.",
    link: "https://leetcode.com/problems/longest-palindromic-substring/",
  },
  {
    id: 6,
    title: "Maximum Sum Subarray of Size K",
    difficulty: "easy",
    description:
      "Find the maximum sum of a contiguous subarray of size k in the array.",
    tags: ["Sliding Window", "Array"],
    companies: ["Amazon", "Salesforce"],
    code: `function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i-k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Use a fixed-size sliding window: sum first k elements, then slide by adding new and removing old.",
    link: "https://leetcode.com/problems/maximum-subarray-sum-with-length-k/",
  },
  {
    id: 7,
    title: "Sliding Window Maximum",
    difficulty: "hard",
    description:
      "Given an array nums and a window size k, return the maximum for each sliding window.",
    tags: ["Deque", "Sliding Window"],
    companies: ["Meta", "Salesforce"],
    code: `function maxSlidingWindow(nums, k) {
  const res = [], deque = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && nums[deque[deque.length-1]] < nums[i]) deque.pop();
    deque.push(i);
    if (deque[0] === i - k) deque.shift();
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(k)`,
    explanation:
      "Maintain a decreasing deque of indices; front is max. Pop smaller elements before adding new.",
    link: "https://leetcode.com/problems/sliding-window-maximum/",
  },
  {
    id: 8,
    title: "Container With Most Water",
    difficulty: "medium",
    description:
      "Given n non-negative integers, find two lines that together with x-axis form a container containing the most water.",
    tags: ["Two Pointers", "Greedy"],
    companies: ["Google", "Uber"],
    code: `function maxArea(height) {
  let l = 0, r = height.length - 1, maxA = 0;
  while (l < r) {
    maxA = Math.max(maxA, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return maxA;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Two pointers from ends, move the shorter inward to possibly find taller boundary.",
    link: "https://leetcode.com/problems/container-with-most-water/",
  },
  {
    id: 9,
    title: "Trapping Rain Water",
    difficulty: "hard",
    description:
      "Given n non-negative integers representing elevation map, compute how much water it can trap.",
    tags: ["Two Pointers", "Prefix Sum"],
    companies: ["Amazon", "Bloomberg"],
    code: `function trap(height) {
  let l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      water += leftMax - height[l++];
    } else {
      rightMax = Math.max(rightMax, height[r]);
      water += rightMax - height[r--];
    }
  }
  return water;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Maintain left/right max boundaries; trap water on the side with shorter current height.",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    id: 10,
    title: "Minimum Size Subarray Sum",
    difficulty: "medium",
    description:
      "Find the minimal length of a contiguous subarray of which the sum ≥ target.",
    tags: ["Sliding Window", "Two Pointers"],
    companies: ["Microsoft", "Goldman Sachs"],
    code: `function minSubArrayLen(s, nums) {
  let left = 0, sum = 0, minLen = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= s) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Expand right to increase sum, then contract left while sum ≥ target to find minimal window.",
    link: "https://leetcode.com/problems/minimum-size-subarray-sum/",
  },
  {
    id: 11,
    title: "Subarray Sum Equals K",
    difficulty: "medium",
    description:
      "Count the total number of continuous subarrays whose sum equals k.",
    tags: ["Prefix Sum", "HashMap"],
    companies: ["Google", "Microsoft"],
    code: `function subarraySum(nums, k) {
  let count = 0, sum = 0, map = new Map([[0,1]]);
  for (const n of nums) {
    sum += n;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Prefix sum + hash map of frequencies: for each sum, look up (sum−k).",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
  },
  {
    id: 12,
    title: "Range Sum Query - Immutable",
    difficulty: "easy",
    description:
      "Given an integer array, return sum of elements between indices i and j inclusive.",
    tags: ["Prefix Sum", "Preprocessing"],
    companies: ["Oracle", "Citrix"],
    code: `class NumArray {
  constructor(nums) {
    this.dp = [0];
    for (let i = 0; i < nums.length; i++)
      this.dp[i+1] = this.dp[i] + nums[i];
  }
  sumRange(i, j) {
    return this.dp[j+1] - this.dp[i];
  }
}`,
    complexity: `// Time (build): O(n)
// Sum query: O(1)
// Space: O(n)`,
    explanation: "Precompute prefix sums in dp[]. sumRange is dp[j+1]−dp[i].",
    link: "https://leetcode.com/problems/range-sum-query-immutable/",
  },
  {
    id: 13,
    title: "Binary Search",
    difficulty: "easy",
    description:
      "Implement binary search to find target in a sorted array; return index or -1.",
    tags: ["Binary Search", "Divide and Conquer"],
    companies: ["Adobe", "Facebook"],
    code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    nums[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return -1;
}`,
    complexity: `// Time: O(log n)
// Space: O(1)`,
    explanation:
      "Standard half-interval search; compare mid to target, move pointers.",
    link: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: 14,
    title: "Search in Rotated Sorted Array",
    difficulty: "medium",
    description:
      "Search a target in a rotated sorted array without duplicates in O(log n).",
    tags: ["Binary Search", "Array"],
    companies: ["Google", "Amazon"],
    code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (target < nums[mid] && target >= nums[l]) r = mid - 1;
      else l = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}`,
    complexity: `// Time: O(log n)
// Space: O(1)`,
    explanation:
      "Determine which half is sorted, then binary search that half if target lies within.",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    id: 15,
    title: "Merge Intervals",
    difficulty: "medium",
    description: "Merge all overlapping intervals in a collection.",
    tags: ["Intervals", "Sorting"],
    companies: ["VMware", "Intuit"],
    code: `function merge(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);
  const res=[intervals[0]];
  for(let i=1;i<intervals.length;i++){
    const [s,e]=intervals[i], last=res[res.length-1];
    if(s<=last[1]) last[1]=Math.max(last[1],e);
    else res.push([s,e]);
  }
  return res;
}`,
    complexity: `// Time: O(n log n)
// Space: O(n)`,
    explanation:
      "Sort by start, then either merge with last or push new interval.",
    link: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    id: 16,
    title: "Reverse a Linked List",
    difficulty: "easy",
    description: "Reverse a singly linked list.",
    tags: ["Linked List", "Iteration"],
    companies: ["Amazon", "TCS"],
    code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation: "Iteratively rewire next pointers, tracking previous node.",
    link: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    id: 17,
    title: "Detect Cycle in Linked List",
    difficulty: "easy",
    description: "Return the node where the cycle begins, or null if no cycle.",
    tags: ["Linked List", "Two Pointers"],
    companies: ["Google", "Microsoft"],
    code: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let entry = head;
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry;
    }
  }
  return null;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Use Floyd’s cycle detection; reset one pointer to head to find entry point.",
    link: "https://leetcode.com/problems/linked-list-cycle-ii/",
  },
  {
    id: 18,
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    description:
      "Merge two sorted linked lists and return it as a sorted list.",
    tags: ["Linked List", "Recursion"],
    companies: ["Meta", "Infosys"],
    code: `function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}`,
    complexity: `// Time: O(m+n)
// Space: O(m+n) recursion`,
    explanation: "Recursively pick the smaller head and merge rest.",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    id: 19,
    title: "Valid Parentheses",
    difficulty: "easy",
    description:
      "Check if an input string of brackets is valid (closed in correct order).",
    tags: ["Stack", "String"],
    companies: ["Apple", "Atlassian"],
    code: `function isValid(s) {
  const map = {'(':')','[':']','{':'}'}, stack=[];
  for (const c of s) {
    if (map[c]) stack.push(c);
    else {
      if (map[stack.pop()] !== c) return false;
    }
  }
  return stack.length === 0;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation: "Push opening brackets; on closing, pop and check matching.",
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: 20,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "medium",
    description:
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation.",
    tags: ["Stack", "Math"],
    companies: ["Stripe", "Rakuten"],
    code: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (!isNaN(t)) stack.push(+t);
    else {
      const b = stack.pop(), a = stack.pop();
      stack.push({
        '+': a + b, '-': a - b,
        '*': a * b, '/': Math.trunc(a / b)
      }[t]);
    }
  }
  return stack[0];
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use stack: push numbers, on operator pop two, compute, push result.",
    link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
  },
  {
    id: 21,
    title: "Climbing Stairs",
    difficulty: "easy",
    description:
      "Each time you can climb 1 or 2 steps. How many distinct ways to reach n?",
    tags: ["Dynamic Programming", "Recursion"],
    companies: ["Google", "Infosys"],
    code: `function climbStairs(n) {
  let [a, b] = [1, 1];
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation: "Fibonacci recurrence: ways(n)=ways(n−1)+ways(n−2).",
    link: "https://leetcode.com/problems/climbing-stairs/",
  },
  {
    id: 22,
    title: "Letter Combinations of a Phone Number",
    difficulty: "medium",
    description:
      "Return all possible letter combos that the number could represent.",
    tags: ["Backtracking", "Recursion"],
    companies: ["Amazon", "Cisco"],
    code: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
  const res = [];
  function backtrack(i, path) {
    if (i === digits.length) {
      res.push(path);
      return;
    }
    for (const c of map[digits[i]]) backtrack(i+1, path + c);
  }
  backtrack(0, '');
  return res;
}`,
    complexity: `// Time: O(4^n * n)
// Space: O(n)`,
    explanation: "Backtrack over digit→letters mapping, build all combos.",
    link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
  },
  {
    id: 23,
    title: "Generate Parentheses",
    difficulty: "medium",
    description:
      "Generate all combinations of well-formed parentheses for n pairs.",
    tags: ["Backtracking", "Recursion"],
    companies: ["Meta", "SAP"],
    code: `function generateParenthesis(n) {
  const res = [];
  function dfs(open, close, s) {
    if (s.length === 2*n) {
      res.push(s);
      return;
    }
    if (open < n) dfs(open+1, close, s+'(');
    if (close < open) dfs(open, close+1, s+')');
  }
  dfs(0,0,'');
  return res;
}`,
    complexity: `// Time: O(4^n / sqrt(n))
// Space: O(4^n / sqrt(n))`,
    explanation: "Backtrack by adding “(” if open<n, “)” if close<open.",
    link: "https://leetcode.com/problems/generate-parentheses/",
  },
  {
    id: 24,
    title: "Sudoku Solver",
    difficulty: "hard",
    description: "Fill a 9×9 Sudoku board so that it becomes valid.",
    tags: ["Backtracking", "Matrix"],
    companies: ["Google", "Nvidia"],
    code: `function solveSudoku(board) {
  const rows = Array.from({length:9},()=>new Set()),
        cols = Array.from({length:9},()=>new Set()),
        boxes= Array.from({length:9},()=>new Set());
  for (let r=0; r<9; r++) for (let c=0; c<9; c++) {
    const v = board[r][c];
    if (v !== '.') {
      rows[r].add(v);
      cols[c].add(v);
      boxes[3*Math.floor(r/3) + Math.floor(c/3)].add(v);
    }
  }
  function dfs(r, c) {
    if (r === 9) return true;
    if (c === 9) return dfs(r+1, 0);
    if (board[r][c] !== '.') return dfs(r, c+1);
    const bIdx = 3*Math.floor(r/3)+Math.floor(c/3);
    for (let v = 1; v <= 9; v++) {
      const s = v.toString();
      if (!rows[r].has(s) && !cols[c].has(s) && !boxes[bIdx].has(s)) {
        board[r][c] = s;
        rows[r].add(s); cols[c].add(s); boxes[bIdx].add(s);
        if (dfs(r, c+1)) return true;
        board[r][c] = '.';
        rows[r].delete(s); cols[c].delete(s); boxes[bIdx].delete(s);
      }
    }
    return false;
  }
  dfs(0,0);
}`,
    complexity: `// Time: Exponential (backtracking)
// Space: O(1)`,
    explanation:
      "Backtracking with row/col/box constraints, fill empty cells depth-first.",
    link: "https://leetcode.com/problems/sudoku-solver/",
  },
  {
    id: 25,
    title: "Set Matrix Zeroes",
    difficulty: "medium",
    description:
      "If an element is 0, set its entire row and column to 0 in-place.",
    tags: ["Matrix", "In-Place"],
    companies: ["Adobe", "Samsung"],
    code: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let row0 = false;
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) row0 = true;
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }
  for (let i = m-1; i >= 0; i--) {
    for (let j = n-1; j >= 1; j--) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }
    if (row0) matrix[i][0] = 0;
  }
}`,
    complexity: `// Time: O(m*n)
// Space: O(1)`,
    explanation:
      "Use first row/column as markers, then zero cells in reverse to avoid overwriting markers early.",
    link: "https://leetcode.com/problems/set-matrix-zeroes/",
  },
  {
    id: 26,
    title: "Count Word Frequencies",
    difficulty: "easy",
    description: "Given a string, count the frequency of each word.",
    tags: ["Strings", "HashMap"],
    companies: ["Amazon"],
    code: `function countWords(str) {
  const words = str
    .trim()
    .toLowerCase()
    .split(/\\s+/);
  const freq = {};
  for (let w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  return freq;
}`,
    complexity: `// Time: O(n)  
// Space: O(k)`,
    explanation:
      "Tokenize on whitespace, lowercase, then tally counts in an object.",
    link: "https://leetcode.com/problems/word-pattern/",
  },
  {
    id: 27,
    title: "Flatten Nested Arrays",
    difficulty: "medium",
    description:
      "Recursively flatten any depth of nested arrays into one flat array.",
    tags: ["Arrays", "Recursion"],
    companies: ["Facebook"],
    code: `function flatten(arr) {
  return arr.reduce((res, val) =>
    Array.isArray(val)
      ? res.concat(flatten(val))
      : res.concat(val)
  , []);
}`,
    complexity: `// Time: O(n)  
// Space: O(n)`,
    explanation:
      "Use recursion + reduce: when an element is an array, flatten it, otherwise append it.",
    link: "https://lodash.com/docs/#flattenDeep",
  },
  {
    id: 28,
    title: "Longest Palindromic Subsequence",
    difficulty: "medium",
    description:
      "Find the length of the longest palindromic subsequence in a string.",
    tags: ["Strings", "DP"],
    companies: ["Google", "Microsoft"],
    code: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = 2 + dp[i + 1][j - 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}`,
    complexity: `// Time: O(n²)  
// Space: O(n²)`,
    explanation:
      "DP on substrings: expand ends if match; otherwise take max of dropping one end.",
    link: "https://leetcode.com/problems/longest-palindromic-subsequence/",
  },
  {
    id: 29,
    title: "Debounce Function",
    difficulty: "medium",
    description: "Implement a debounce utility to delay rapid function calls.",
    tags: ["Javascript", "Timer"],
    companies: ["Google", "LinkedIn"],
    code: `function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    complexity: `// Time: O(1)  
// Space: O(1)`,
    explanation:
      "Cancel previous timeout on each call; schedule new invocation after delay.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout",
  },
  {
    id: 30,
    title: "Validate Brackets",
    difficulty: "easy",
    description: "Check if a string of brackets is valid using a stack.",
    tags: ["Stacks", "Strings"],
    companies: ["Apple", "Amazon"],
    code: `function isValid(s) {
  const map = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (let ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    complexity: `// Time: O(n)  
// Space: O(n)`,
    explanation:
      "Push opens to stack; on closing bracket check top matches corresponding opener.",
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: 31,
    title: "URL Shortener",
    difficulty: "hard",
    description: "Design a system to shorten URLs and handle redirection.",
    tags: ["System Design", "Hashing"],
    companies: ["TinyURL", "Google"],
    code: `class URLShortener {
  constructor() {
    this.map = new Map();
    this.prefix = 'http://tiny.url/';
  }
  encode(longUrl) {
    const key = Math.random().toString(36).substr(2, 6);
    this.map.set(key, longUrl);
    return this.prefix + key;
  }
  decode(shortUrl) {
    const key = shortUrl.replace(this.prefix, '');
    return this.map.get(key);
  }
}`,
    complexity: `// Time: O(1)  
// Space: O(n)`,
    explanation: "Generate random key → map key↔URL; decode by lookup.",
    link: "https://leetcode.com/problems/encode-and-decode-tinyurl/",
  },
  {
    id: 32,
    title: "BST Operations",
    difficulty: "medium",
    description: "Implement insert, delete, and search operations in a BST.",
    tags: ["Trees", "Recursion"],
    companies: ["Google", "Microsoft"],
    code: `class Node {
  constructor(v){ this.v=v; this.left=this.right=null; }
}
function insert(root, val) {
  if (!root) return new Node(val);
  if (val < root.v) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}`,
    complexity: `// Time: O(h)  
// Space: O(h)`,
    explanation: "Recurse down left/right based on value; h = tree height.",
    link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
  },
  {
    id: 33,
    title: "Memoization Utility",
    difficulty: "easy",
    description: "Create a memoization wrapper for pure functions.",
    tags: ["Javascript", "Optimization"],
    companies: ["Netflix"],
    code: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const res = fn(...args);
    cache.set(key, res);
    return res;
  };
}`,
    complexity: `// Time: O(1) per repeat call  
// Space: O(n)`,
    explanation:
      "Cache results on first call, reuse on subsequent identical args.",
    link: "https://en.wikipedia.org/wiki/Memoization",
  },
  {
    id: 34,
    title: "Throttle Function",
    difficulty: "medium",
    description: "Ensure a function is called at most once per interval.",
    tags: ["Javascript", "Timer"],
    companies: ["Uber"],
    code: `function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}`,
    complexity: `// Time: O(1)  
// Space: O(1)`,
    explanation: "Track last execution; only invoke if enough time has passed.",
    link: "https://css-tricks.com/debouncing-throttling-explained-examples/",
  },
  {
    id: 35,
    title: "Rotate Image",
    difficulty: "medium",
    description: "Rotate an n×n matrix 90° clockwise in-place.",
    tags: ["Matrix", "In-Place"],
    companies: ["Amazon", "Facebook"],
    code: `function rotate(m) {
  const n = m.length;
  for (let i = 0; i < n; i++)
    for (let j = i; j < n; j++)
      [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
  for (let row of m) row.reverse();
}`,
    complexity: `// Time: O(n²)  
// Space: O(1)`,
    explanation: "Transpose matrix then reverse each row for 90° rotation.",
    link: "https://leetcode.com/problems/rotate-image/",
  },
  {
    id: 36,
    title: "Product Except Self",
    difficulty: "medium",
    description:
      "Return an array where each element is product of all other elements.",
    tags: ["Arrays", "Prefix Product"],
    companies: ["Google", "Uber"],
    code: `function productExceptSelf(nums) {
  const n = nums.length, res = Array(n).fill(1);
  let left = 1, right = 1;
  for (let i = 0; i < n; i++) {
    res[i] *= left;
    left *= nums[i];
    res[n-1-i] *= right;
    right *= nums[n-1-i];
  }
  return res;
}`,
    complexity: `// Time: O(n)  
// Space: O(1) (output doesn’t count)`,
    explanation:
      "Two passes: accumulate product from left and right into res array.",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
  },
  {
    id: 37,
    title: "Clone Graph",
    difficulty: "medium",
    description: "Deep clone an undirected graph given a node reference.",
    tags: ["Graphs", "DFS"],
    companies: ["Google", "Microsoft"],
    code: `function cloneGraph(node, map = new Map()) {
  if (!node) return null;
  if (map.has(node)) return map.get(node);
  const copy = { val: node.val, neighbors: [] };
  map.set(node, copy);
  for (let n of node.neighbors)
    copy.neighbors.push(cloneGraph(n, map));
  return copy;
}`,
    complexity: `// Time: O(V+E)  
// Space: O(V)`,
    explanation:
      "DFS with map to avoid revisiting; clone nodes & their edges recursively.",
    link: "https://leetcode.com/problems/clone-graph/",
  },
  {
    id: 38,
    title: "LRU Cache",
    difficulty: "hard",
    description: "Design an LRU cache with O(1) get and put operations.",
    tags: ["Design", "HashMap", "DoublyLinkedList"],
    companies: ["Amazon", "Google"],
    code: `class LRUCache {
  constructor(cap) {
    this.cap = cap;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.cap)
      this.map.delete(this.map.keys().next().value);
  }
}`,
    complexity: `// Time: O(1)  
// Space: O(capacity)`,
    explanation:
      "Use Map’s insertion order: delete + reinsert moves key to “most recent.”",
    link: "https://leetcode.com/problems/lru-cache/",
  },
  {
    id: 39,
    title: "Form Validation Schema",
    difficulty: "medium",
    description: "Validate an object against a JSON schema of rules.",
    tags: ["Javascript", "Validation"],
    companies: ["Airbnb"],
    code: `function validate(obj, schema) {
  for (let key in schema) {
    const rule = schema[key];
    const val = obj[key];
    if (rule.required && !(key in obj)) return false;
    if (rule.type && typeof val !== rule.type) return false;
  }
  return true;
}`,
    complexity: `// Time: O(n)  
// Space: O(1)`,
    explanation:
      "Iterate schema rules, check required fields and types against object.",
    link: "https://json-schema.org/",
  },
  {
    id: 40,
    title: "Rate Limiter",
    difficulty: "hard",
    description: "Implement a sliding-window API rate limiter per user/IP.",
    tags: ["System Design", "SlidingWindow"],
    companies: ["Stripe"],
    code: `class RateLimiter {
  constructor(maxCalls, windowMs) {
    this.max = maxCalls;
    this.win = windowMs;
    this.calls = [];
  }
  allow() {
    const now = Date.now();
    this.calls = this.calls.filter(t => now - t < this.win);
    if (this.calls.length < this.max) {
      this.calls.push(now);
      return true;
    }
    return false;
  }
}`,
    complexity: `// Time: O(n) per call  
// Space: O(n)`,
    explanation: "Keep timestamps in array, purge old, allow if under limit.",
    link: "https://en.wikipedia.org/wiki/Rate_limiting",
  },
  {
    id: 41,
    title: "Inorder Traversal",
    difficulty: "easy",
    description:
      "Return inorder traversal of a binary tree (recursive & iterative).",
    tags: ["Trees", "DFS"],
    companies: ["Google", "Microsoft"],
    code: `// Recursive:
function inorder(r, res = []) {
  if (!r) return res;
  inorder(r.left, res);
  res.push(r.val);
  inorder(r.right, res);
  return res;
}
// Iterative:
function inorderIter(root) {
  const res = [], stack = [], cur = root;
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    res.push(node.val);
    node = node.right;
  }
  return res;
}`,
    complexity: `// Time: O(n)  
// Space: O(n)`,
    explanation:
      "Classic DFS: recurse or use stack to simulate call stack for inorder.",
    link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  },
  {
    id: 42,
    title: "Minimum Window Substring",
    difficulty: "hard",
    description: "Find smallest substring containing all chars of t in s.",
    tags: ["Sliding Window", "HashMap"],
    companies: ["Amazon", "Google"],
    code: `function minWindow(s, t) {
  const need = {}, win = {};
  for (let c of t) need[c] = (need[c]||0)+1;
  let have=0, needCount=Object.keys(need).length, res=[-1,-1], len=Infinity;
  let l=0;
  for (let r=0; r<s.length; r++) {
    const c = s[r];
    win[c] = (win[c]||0)+1;
    if (need[c] && win[c] === need[c]) have++;
    while (have === needCount) {
      if (r-l+1 < len) [res, len] = [[l, r], r-l+1];
      win[s[l]]--;
      if (need[s[l]] && win[s[l]] < need[s[l]]) have--;
      l++;
    }
  }
  return len === Infinity ? '' : s.slice(res[0], res[1]+1);
}`,
    complexity: `// Time: O(n + m)  
// Space: O(n + m)`,
    explanation:
      "Expand right, track counts; contract left when all needed chars matched.",
    link: "https://leetcode.com/problems/minimum-window-substring/",
  },
  {
    id: 43,
    title: "Dynamic Form Renderer",
    difficulty: "medium",
    description: "Render HTML form based on JSON schema at runtime.",
    tags: ["Javascript", "React"],
    companies: ["Airbnb"],
    code: `function DynamicForm({ schema, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {schema.fields.map(f => (
        <div key={f.name}>
          <label>{f.label}</label>
          <input
            name={f.name}
            type={f.type}
            defaultValue={f.default || ''}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}`,
    complexity: `// Time: O(n)  
// Space: O(n)`,
    explanation:
      "Loop through schema.fields to generate inputs and labels dynamically.",
    link: "https://reactjs.org/docs/forms.html",
  },
  {
    id: 44,
    title: "Merge Intervals",
    difficulty: "medium",
    description: "Given intervals, merge all overlapping ones.",
    tags: ["Arrays", "Sorting"],
    companies: ["VMware", "Intuit"],
    code: `function merge(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);
  const res = [intervals[0]];
  for (let [s,e] of intervals.slice(1)) {
    const last = res[res.length-1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else res.push([s,e]);
  }
  return res;
}`,
    complexity: `// Time: O(n log n)  
// Space: O(n)`,
    explanation:
      "Sort by start, then merge or append based on overlap with last interval.",
    link: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    id: 45,
    title: "Autocomplete System",
    difficulty: "hard",
    description: "Design a real-time autocomplete suggestion engine.",
    tags: ["System Design", "Trie"],
    companies: ["Google", "Microsoft"],
    code: `class TrieNode {
  constructor() { this.children = {}; this.hot = {}; }
}
class AutocompleteSystem {
  constructor(sentences, times) {
    this.root = new TrieNode();
    this.input = '';
    sentences.forEach((s,i)=> this._add(s,times[i]));
  }
  _add(s,t) {
    let node = this.root;
    for (let c of s) {
      node.children[c] = node.children[c]||new TrieNode();
      node = node.children[c];
      node.hot[s] = (node.hot[s]||0)+t;
    }
  }
  inputChar(c) {
    if (c==='\\n') {
      this._add(this.input,1);
      this.input = '';
      return [];
    }
    this.input += c;
    let node = this.root;
    for (let ch of this.input) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    return Object.entries(node.hot)
      .sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))
      .slice(0,3)
      .map(x=>x[0]);
  }
}`,
    complexity: `// Time: O(n * l) per add/search  
// Space: O(total chars)`,
    explanation:
      "Use trie storing hot counts at each node; update and query top 3 suggestions.",
    link: "https://leetcode.com/problems/design-search-autocomplete-system/",
  },
  {
    id: 46,
    title: "Detect Cycle in Directed Graph",
    difficulty: "medium",
    description: "Use DFS recursion stack to detect cycle in directed graph.",
    tags: ["Graphs", "DFS"],
    companies: ["Facebook", "Google"],
    code: `function hasCycle(n, edges) {
  const adj = Array.from({length:n},()=>[]);
  edges.forEach(([u,v])=>adj[u].push(v));
  const visited = new Array(n).fill(0);
  function dfs(u) {
    if (visited[u] === 1) return true;
    if (visited[u] === 2) return false;
    visited[u] = 1;
    for (let v of adj[u]) if (dfs(v)) return true;
    visited[u] = 2;
    return false;
  }
  for (let i=0;i<n;i++) if (dfs(i)) return true;
  return false;
}`,
    complexity: `// Time: O(V+E)  
// Space: O(V)`,
    explanation:
      "0=unseen,1=visiting,2=done; a back-edge to 1 indicates a cycle.",
    link: "https://leetcode.com/problems/course-schedule/",
  },
  {
    id: 47,
    title: "Find Peak Element",
    difficulty: "medium",
    description:
      "In an array where a[i] ≠ a[i+1], find any peak (local maximum) in O(log n).",
    tags: ["Binary Search", "Divide and Conquer"],
    companies: ["Microsoft", "Google"],
    code: `function findPeak(nums) {
  let l=0,r=nums.length-1;
  while(l<r) {
    const m=(l+r)>>1;
    if (nums[m]>nums[m+1]) r=m;
    else l=m+1;
  }
  return l;
}`,
    complexity: `// Time: O(log n)  
// Space: O(1)`,
    explanation: "Binary search on slope: go uphill to find a peak.",
    link: "https://leetcode.com/problems/find-peak-element/",
  },
  {
    id: 48,
    title: "Implement Trie",
    difficulty: "medium",
    description:
      "Build a prefix tree for insert, search, and startsWith operations.",
    tags: ["Data Structures", "Trie"],
    companies: ["Google", "Microsoft"],
    code: `class TrieNode {
  constructor() { this.next = {}; this.end=false; }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(w) {
    let node = this.root;
    for (let c of w) {
      node.next[c] = node.next[c]||new TrieNode();
      node = node.next[c];
    }
    node.end = true;
  }
  search(w) {
    let node = this.root;
    for (let c of w) {
      node = node.next[c];
      if (!node) return false;
    }
    return node.end;
  }
  startsWith(p) {
    let node = this.root;
    for (let c of p) {
      node = node.next[c];
      if (!node) return false;
    }
    return true;
  }
}`,
    complexity: `// Time: O(L) per op  
// Space: O(sum of lengths)`,
    explanation: "Standard trie node with map of children and end flag.",
    link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
  },
  {
    id: 49,
    title: "JSON Diff Viewer",
    difficulty: "medium",
    description: "Compare two JSON objects and produce their diff.",
    tags: ["Javascript", "Recursion"],
    companies: ["Dropbox"],
    code: `function diff(a, b) {
  const res = {};
  for (let k of new Set([...Object.keys(a),...Object.keys(b)])) {
    if (typeof a[k] === 'object' && typeof b[k] === 'object') {
      const d = diff(a[k], b[k]);
      if (Object.keys(d).length) res[k] = d;
    } else if (a[k] !== b[k]) {
      res[k] = { from: a[k], to: b[k] };
    }
  }
  return res;
}`,
    complexity: `// Time: O(n)  
// Space: O(n)`,
    explanation:
      "Recurse into nested objects, collect keys that differ with old→new values.",
    link: "https://github.com/kpdecker/jsdiff",
  },
  {
    id: 50,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    description:
      "Given prices array, maximize profit with one buy-sell transaction.",
    tags: ["Arrays", "Greedy"],
    companies: ["Amazon", "Goldman Sachs"],
    code: `function maxProfit(prices) {
  let minP = Infinity, maxP = 0;
  for (let p of prices) {
    minP = Math.min(minP, p);
    maxP = Math.max(maxP, p - minP);
  }
  return maxP;
}`,
    complexity: `// Time: O(n)  
// Space: O(1)`,
    explanation:
      "Track minimum price so far; compute max difference at each step.",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  {
    id: 51,
    title: "Two Sum",
    difficulty: "easy",
    description:
      "Given an array and target, return indices of two numbers summing to target.",
    tags: ["Arrays", "HashMap"],
    companies: ["Google", "Amazon"],
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Store each number’s index in a map; lookup complement in one pass.",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 52,
    title: "Top K Frequent Elements",
    difficulty: "medium",
    description: "Return the k most frequent elements in an array.",
    tags: ["Heap", "HashMap"],
    companies: ["Amazon", "Google"],
    code: `function topKFrequent(nums, k) {
  const freq = {};
  nums.forEach(n => freq[n] = (freq[n]||0) + 1);
  const buckets = Array(nums.length + 1).fill().map(() => []);
  for (let n in freq) buckets[freq[n]].push(Number(n));
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
  }
  return res.slice(0, k);
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Bucket-sort frequencies by count and gather top k from highest bucket.",
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
  },
  {
    id: 53,
    title: "Validate Binary Search Tree",
    difficulty: "medium",
    description: "Check if a binary tree is a valid BST.",
    tags: ["Trees", "DFS"],
    companies: ["Microsoft", "Amazon"],
    code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}`,
    complexity: `// Time: O(n)
// Space: O(h)`,
    explanation:
      "Recursively enforce valid range for each node’s value in subtrees.",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
  },
  {
    id: 54,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "hard",
    description: "Convert a binary tree to string and back.",
    tags: ["Trees", "Design"],
    companies: ["Google", "Facebook"],
    code: `const SEP = ',';
const NULL = '#';
function serialize(root) {
  if (!root) return NULL;
  return root.val + SEP + serialize(root.left) + SEP + serialize(root.right);
}
function deserialize(data) {
  const vals = data.split(SEP);
  function build() {
    const v = vals.shift();
    if (v === NULL) return null;
    const node = { val: Number(v), left: null, right: null };
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Preorder traversal with null markers for unambiguous reconstruction.",
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
  },
  {
    id: 55,
    title: "Implement Promise.all",
    difficulty: "medium",
    description: "Polyfill Promise.all to aggregate multiple promises.",
    tags: ["Javascript", "Promises"],
    companies: ["Netflix", "Uber"],
    code: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(v => {
          results[i] = v;
          completed += 1;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Wrap each promise; collect results by index; resolve when all settle.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
  },
  {
    id: 56,
    title: "Deep Clone Object",
    difficulty: "medium",
    description: "Perform a deep clone of objects, arrays, Dates, and regex.",
    tags: ["Javascript", "Recursion"],
    companies: ["Google", "Airbnb"],
    code: `function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);
  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);
  for (let key of Reflect.ownKeys(obj)) {
    copy[key] = deepClone(obj[key], map);
  }
  return copy;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use recursion with WeakMap to handle circular refs and clone nested structures.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
  },
  {
    id: 57,
    title: "Event Emitter",
    difficulty: "medium",
    description: "Implement on, emit, and off for an event-driven system.",
    tags: ["Javascript", "Design"],
    companies: ["Node.js", "LinkedIn"],
    code: `class EventEmitter {
  constructor() { this.events = {}; }
  on(evt, fn) {
    (this.events[evt] = this.events[evt] || []).push(fn);
  }
  emit(evt, ...args) {
    (this.events[evt] || []).forEach(fn => fn(...args));
  }
  off(evt, fn) {
    this.events[evt] = (this.events[evt] || [])
      .filter(f => f !== fn);
  }
}`,
    complexity: `// Time: O(n) per emit
// Space: O(n)`,
    explanation:
      "Maintain map of event names to listener arrays; invoke or remove as needed.",
    link: "https://nodejs.org/api/events.html",
  },
  {
    id: 58,
    title: "Zigzag Level Order Traversal",
    difficulty: "medium",
    description:
      "Traverse binary tree levels in alternating left-to-right and right-to-left order.",
    tags: ["Trees", "BFS"],
    companies: ["Amazon", "Microsoft"],
    code: `function zigzagLevelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root], dir = true;
  let leftToRight = true;
  while (queue.length) {
    const size = queue.length, level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (leftToRight) level.push(node.val);
      else level.unshift(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
    leftToRight = !leftToRight;
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation: "BFS per level; reverse insertion order on alternate levels.",
    link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
  },
  {
    id: 59,
    title: "Word Search",
    difficulty: "hard",
    description:
      "Given grid and word, check if word exists by traversing adjacent cells.",
    tags: ["Backtracking", "Matrix"],
    companies: ["Google"],
    code: `function exist(board, word) {
  const m = board.length, n = board[0].length;
  function dfs(i, j, idx) {
    if (idx === word.length) return true;
    if (i<0||j<0||i>=m||j>=n||board[i][j]!==word[idx]) return false;
    const tmp = board[i][j];
    board[i][j] = '*';
    const found = dfs(i+1,j,idx+1) || dfs(i-1,j,idx+1)
               || dfs(i,j+1,idx+1) || dfs(i,j-1,idx+1);
    board[i][j] = tmp;
    return found;
  }
  for (let i=0;i<m;i++)
    for (let j=0;j<n;j++)
      if (dfs(i,j,0)) return true;
  return false;
}`,
    complexity: `// Time: O(m·n·4^L)
// Space: O(L)`,
    explanation:
      "Backtracking with marking visited cells and exploring 4 directions.",
    link: "https://leetcode.com/problems/word-search/",
  },
  {
    id: 60,
    title: "N-Queens",
    difficulty: "hard",
    description:
      "Place N queens on N×N board so no two attack each other; return all solutions.",
    tags: ["Backtracking"],
    companies: ["Amazon", "Google"],
    code: `function solveNQueens(n) {
  const res = [], cols = new Set(), diag = new Set(), anti = new Set();
  const board = Array.from({length:n},()=>Array(n).fill('.'));
  function backtrack(r) {
    if (r === n) {
      res.push(board.map(row => row.join('')));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r-c) || anti.has(r+c)) continue;
      cols.add(c); diag.add(r-c); anti.add(r+c);
      board[r][c] = 'Q';
      backtrack(r+1);
      board[r][c] = '.';
      cols.delete(c); diag.delete(r-c); anti.delete(r+c);
    }
  }
  backtrack(0);
  return res;
}`,
    complexity: `// Time: O(n!)
// Space: O(n^2)`,
    explanation:
      "Backtrack row by row, track columns and diagonals to prune conflicts.",
    link: "https://leetcode.com/problems/n-queens/",
  },
  {
    id: 61,
    title: "Generate Parentheses",
    difficulty: "medium",
    description:
      "Generate all combinations of well-formed parentheses for n pairs.",
    tags: ["Backtracking"],
    companies: ["Google", "Facebook"],
    code: `function generateParenthesis(n) {
  const res = [];
  function backtrack(s = '', open = 0, close = 0) {
    if (s.length === 2*n) {
      res.push(s);
      return;
    }
    if (open < n) backtrack(s+'(', open+1, close);
    if (close < open) backtrack(s+')', open, close+1);
  }
  backtrack();
  return res;
}`,
    complexity: `// Time: O(4^n / sqrt(n))
// Space: O(n)`,
    explanation:
      'Backtrack adding "(" or ")" while maintaining valid prefix constraints.',
    link: "https://leetcode.com/problems/generate-parentheses/",
  },
  {
    id: 62,
    title: "Sliding Window Maximum",
    difficulty: "hard",
    description: "Find maximum in each window of size k using deque.",
    tags: ["Deque", "Sliding Window"],
    companies: ["Microsoft", "Amazon"],
    code: `function maxSlidingWindow(nums, k) {
  const res = [], dq = [];
  for (let i = 0; i < nums.length; i++) {
    if (dq[0] === i - k) dq.shift();
    while (dq.length && nums[dq[dq.length-1]] < nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(k)`,
    explanation:
      "Maintain indices in deque in decreasing order; front is window max.",
    link: "https://leetcode.com/problems/sliding-window-maximum/",
  },
  {
    id: 63,
    title: "Trapping Rain Water",
    difficulty: "hard",
    description: "Compute how much water can be trapped between bars.",
    tags: ["Two Pointers", "Dynamic Programming"],
    companies: ["Facebook", "Amazon"],
    code: `function trap(height) {
  let l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= leftMax) leftMax = height[l];
      else res += leftMax - height[l];
      l++;
    } else {
      if (height[r] >= rightMax) rightMax = height[r];
      else res += rightMax - height[r];
      r--;
    }
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Two-pointer scan, accumulate water by tracking left/right max heights.",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    id: 64,
    title: "Find Median from Data Stream",
    difficulty: "hard",
    description: "Support adding numbers and finding median in O(log n).",
    tags: ["Heap", "Design"],
    companies: ["Google", "Amazon"],
    code: `class MedianFinder {
  constructor() {
    this.small = new MaxPriorityQueue();
    this.large = new MinPriorityQueue();
  }
  addNum(num) {
    this.small.enqueue(num);
    this.large.enqueue(this.small.dequeue().element);
    if (this.small.size() < this.large.size()) {
      this.small.enqueue(this.large.dequeue().element);
    }
  }
  findMedian() {
    if (this.small.size() > this.large.size()) return this.small.front().element;
    return (this.small.front().element + this.large.front().element) / 2;
  }
}`,
    complexity: `// Time: O(log n) per insertion
// Space: O(n)`,
    explanation:
      "Balance two heaps so their sizes differ by ≤1; median from tops.",
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
  },
  {
    id: 65,
    title: "Design Twitter",
    difficulty: "hard",
    description:
      "Build a simplified Twitter: post tweets, follow, and get news feed.",
    tags: ["Design", "HashMap", "LinkedList"],
    companies: ["Twitter", "Uber"],
    code: `class Twitter {
  constructor() {
    this.time = 0;
    this.tweets = new Map();
    this.follows = new Map();
  }
  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).unshift([this.time++, tweetId]);
  }
  getNewsFeed(userId) {
    const feed = [];
    const people = (this.follows.get(userId) || new Set());
    people.add(userId);
    people.forEach(u => {
      const arr = this.tweets.get(u) || [];
      for (let i = 0; i < Math.min(10, arr.length); i++) {
        feed.push(arr[i]);
      }
    });
    return feed
      .sort((a,b)=>b[0]-a[0])
      .slice(0,10)
      .map(x=>x[1]);
  }
  follow(followerId, followeeId) {
    if (!this.follows.has(followerId)) this.follows.set(followerId, new Set());
    this.follows.get(followerId).add(followeeId);
  }
  unfollow(followerId, followeeId) {
    this.follows.get(followerId)?.delete(followeeId);
  }
}`,
    complexity: `// Time: O(k log k) for feed (k tweets)
// Space: O(n + m)`,
    explanation:
      "Map tweets per user with timestamp; merge-sort top entries for feed.",
    link: "https://leetcode.com/problems/design-twitter/",
  },
  {
    id: 66,
    title: "Majority Element",
    difficulty: "easy",
    description:
      "Find element appearing more than ⌊n/2⌋ times using Boyer-Moore.",
    tags: ["Arrays", "Voting Algorithm"],
    companies: ["Amazon", "Microsoft"],
    code: `function majorityElement(nums) {
  let count = 0, candidate = null;
  for (let n of nums) {
    if (count === 0) candidate = n;
    count += (n === candidate) ? 1 : -1;
  }
  return candidate;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Maintain a candidate and cancel out pairs of different elements.",
    link: "https://leetcode.com/problems/majority-element/",
  },
  {
    id: 67,
    title: "Group Anagrams",
    difficulty: "medium",
    description: "Group strings that are anagrams of each other.",
    tags: ["HashMap", "Strings"],
    companies: ["Google", "Facebook"],
    code: `function groupAnagrams(strs) {
  const map = {};
  for (let s of strs) {
    const key = s.split('').sort().join('');
    map[key] = map[key] || [];
    map[key].push(s);
  }
  return Object.values(map);
}`,
    complexity: `// Time: O(n k log k)
// Space: O(n k)`,
    explanation:
      "Sort each string as key; collect originals in a hash map by sorted key.",
    link: "https://leetcode.com/problems/group-anagrams/",
  },
  {
    id: 68,
    title: "Number of Islands",
    difficulty: "medium",
    description: "Count islands in grid of 0s and 1s using DFS/BFS.",
    tags: ["DFS", "Matrix"],
    companies: ["Google", "Amazon"],
    code: `function numIslands(grid) {
  if (!grid.length) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(i,j) {
    if (i<0||j<0||i>=m||j>=n||grid[i][j]==='0') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  for (let i=0;i<m;i++)
    for (let j=0;j<n;j++)
      if (grid[i][j] === '1') {
        count++; dfs(i,j);
      }
  return count;
}`,
    complexity: `// Time: O(m·n)
// Space: O(m·n)`,
    explanation:
      "Traverse grid; on finding land, flood-fill to mark entire island visited.",
    link: "https://leetcode.com/problems/number-of-islands/",
  },
  {
    id: 69,
    title: "Word Ladder",
    difficulty: "hard",
    description:
      "Transform beginWord to endWord by changing one letter at a time.",
    tags: ["BFS", "Strings"],
    companies: ["Amazon", "Microsoft"],
    code: `function ladderLength(begin, end, list) {
  const set = new Set(list);
  const q = [[begin,1]];
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  while (q.length) {
    const [word, d] = q.shift();
    if (word === end) return d;
    for (let i = 0; i < word.length; i++) {
      for (let c of alpha) {
        const nxt = word.slice(0,i) + c + word.slice(i+1);
        if (set.has(nxt)) {
          set.delete(nxt);
          q.push([nxt,d+1]);
        }
      }
    }
  }
  return 0;
}`,
    complexity: `// Time: O(N·L·26)
// Space: O(N·L)`,
    explanation:
      "BFS through one-letter transformations, tracking distance until target.",
    link: "https://leetcode.com/problems/word-ladder/",
  },
  {
    id: 70,
    title: "Kth Smallest Element in BST",
    difficulty: "medium",
    description: "Return the k-th smallest value in a BST.",
    tags: ["Trees", "DFS"],
    companies: ["Microsoft", "Amazon"],
    code: `function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  while (true) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
}`,
    complexity: `// Time: O(h + k)
// Space: O(h)`,
    explanation: "Inorder traversal with stack; k-th pop yields k-th smallest.",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
  },
  {
    id: 71,
    title: "Minimum Path Sum",
    difficulty: "medium",
    description: "Find minimal sum path from top-left to bottom-right of grid.",
    tags: ["DP", "Matrix"],
    companies: ["Uber", "Google"],
    code: `function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i && j) {
        grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
      } else {
        grid[i][j] += (i ? grid[i-1][j] : j ? grid[i][j-1] : 0);
      }
    }
  }
  return grid[m-1][n-1];
}`,
    complexity: `// Time: O(m·n)
// Space: O(1)`,
    explanation: "In-place DP: accumulate minimum of top/left into each cell.",
    link: "https://leetcode.com/problems/minimum-path-sum/",
  },
  {
    id: 72,
    title: "Palindrome Partitioning",
    difficulty: "hard",
    description: "Partition string into all possible palindromic substrings.",
    tags: ["Backtracking", "DP"],
    companies: ["Amazon", "Google"],
    code: `function partition(s) {
  const res = [], path = [], n = s.length;
  const dp = Array.from({length:n}, () => Array(n).fill(false));
  for (let i = n-1; i>=0; i--) {
    for (let j = i; j<n; j++) {
      dp[i][j] = s[i]===s[j] && (j-i<2 || dp[i+1][j-1]);
    }
  }
  function dfs(start) {
    if (start === n) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < n; end++) {
      if (dp[start][end]) {
        path.push(s.slice(start, end+1));
        dfs(end+1);
        path.pop();
      }
    }
  }
  dfs(0);
  return res;
}`,
    complexity: `// Time: O(n·2^n)
// Space: O(n^2)`,
    explanation: "Precompute palindromes DP, then backtrack on valid cuts.",
    link: "https://leetcode.com/problems/palindrome-partitioning/",
  },
  {
    id: 73,
    title: "Implement Linked List",
    difficulty: "medium",
    description:
      "Design singly linked list with get, addAtHead, addAtTail, addAtIndex, deleteAtIndex.",
    tags: ["Design", "LinkedList"],
    companies: ["Microsoft", "Google"],
    code: `class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
}
class MyLinkedList {
  constructor() { this.size = 0; this.head = new ListNode(0); }
  get(index) {
    if (index < 0 || index >= this.size) return -1;
    let cur = this.head.next;
    for (let i = 0; i < index; i++) cur = cur.next;
    return cur.val;
  }
  addAtHead(val) { this.addAtIndex(0, val); }
  addAtTail(val) { this.addAtIndex(this.size, val); }
  addAtIndex(index, val) {
    if (index > this.size || index < 0) return;
    this.size++;
    let pred = this.head;
    for (let i = 0; i < index; i++) pred = pred.next;
    pred.next = new ListNode(val, pred.next);
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;
    this.size--;
    let pred = this.head;
    for (let i = 0; i < index; i++) pred = pred.next;
    pred.next = pred.next.next;
  }
}`,
    complexity: `// Time: O(n) for get/add/delete by index
// Space: O(n)`,
    explanation:
      "Dummy head simplifies insert/delete; traverse to predecessor by index.",
    link: "https://leetcode.com/problems/design-linked-list/",
  },
  {
    id: 74,
    title: "LFU Cache",
    difficulty: "hard",
    description:
      "Design a cache that evicts least-frequently used key in O(1).",
    tags: ["Design", "HashMap", "DoublyLinkedList"],
    companies: ["Google", "Facebook"],
    code: `class LFUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.keyToVal = new Map();
    this.keyToFreq = new Map();
    this.freqToKeys = new Map();
    this.minFreq = 0;
  }
  get(key) {
    if (!this.keyToVal.has(key)) return -1;
    this._updateFreq(key);
    return this.keyToVal.get(key);
  }
  put(key, val) {
    if (this.cap <= 0) return;
    if (this.keyToVal.has(key)) {
      this.keyToVal.set(key, val);
      this._updateFreq(key);
      return;
    }
    if (this.keyToVal.size >= this.cap) {
      const keys = this.freqToKeys.get(this.minFreq);
      const evict = keys.values().next().value;
      keys.delete(evict);
      this.keyToVal.delete(evict);
      this.keyToFreq.delete(evict);
    }
    this.keyToVal.set(key, val);
    this.keyToFreq.set(key, 1);
    this.freqToKeys.set(1, this.freqToKeys.get(1) || new Set());
    this.freqToKeys.get(1).add(key);
    this.minFreq = 1;
  }
  _updateFreq(key) {
    const freq = this.keyToFreq.get(key);
    this.freqToKeys.get(freq).delete(key);
    if (freq === this.minFreq && !this.freqToKeys.get(freq).size) {
      this.minFreq++;
    }
    this.keyToFreq.set(key, freq+1);
    this.freqToKeys.set(freq+1, this.freqToKeys.get(freq+1)||new Set());
    this.freqToKeys.get(freq+1).add(key);
  }
}`,
    complexity: `// Time: O(1)
// Space: O(capacity)`,
    explanation:
      "Track frequency lists and minimum frequency to evict LFU key in O(1).",
    link: "https://leetcode.com/problems/lfu-cache/",
  },
  {
    id: 75,
    title: "Basic Calculator",
    difficulty: "hard",
    description:
      "Evaluate string expression with +, -, parentheses, and spaces.",
    tags: ["Stack", "String Parsing"],
    companies: ["Google", "LinkedIn"],
    code: `function calculate(s) {
  const stack = [];
  let res = 0, num = 0, sign = 1;
  for (let ch of s) {
    if (!isNaN(ch) && ch !== ' ') {
      num = num*10 + Number(ch);
    } else if (ch === '+' || ch === '-') {
      res += sign * num;
      num = 0;
      sign = ch === '+' ? 1 : -1;
    } else if (ch === '(') {
      stack.push(res, sign);
      res = 0; sign = 1;
    } else if (ch === ')') {
      res += sign * num;
      num = 0;
      res *= stack.pop();
      res += stack.pop();
    }
  }
  return res + sign * num;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use stack for result and sign at parentheses; accumulate numbers on the fly.",
    link: "https://leetcode.com/problems/basic-calculator/",
  },
  {
    id: 76,
    title: "Course Schedule II",
    difficulty: "medium",
    description:
      "Find order to finish courses given prerequisites or return empty if cycle.",
    tags: ["Graph", "BFS", "Topological Sort"],
    companies: ["Amazon", "Microsoft"],
    code: `function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);
  for (const [u, v] of prerequisites) {
    adj[v].push(u);
    indegree[u]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) {
      if (--indegree[v] === 0) queue.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}`,
    complexity: `// Time: O(V + E)
// Space: O(V + E)`,
    explanation:
      "Use Kahn’s algorithm: BFS on zero indegree nodes to build topological order.",
    link: "https://leetcode.com/problems/course-schedule-ii/",
  },
  {
    id: 77,
    title: "Word Break",
    difficulty: "medium",
    description:
      "Determine if s can be segmented into a sequence of dictionary words.",
    tags: ["DP", "Strings"],
    companies: ["Microsoft", "Amazon"],
    code: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    complexity: `// Time: O(n^2)
// Space: O(n)`,
    explanation:
      "dp[i] is true if prefix [0,i) can be segmented; check all cuts using a set.",
    link: "https://leetcode.com/problems/word-break/",
  },
  {
    id: 78,
    title: "Find All Anagrams in a String",
    difficulty: "medium",
    description: "Return start indices of p’s anagrams in s.",
    tags: ["Strings", "Sliding Window"],
    companies: ["Amazon", "Microsoft"],
    code: `function findAnagrams(s, p) {
  const res = [], need = {}, window = {};
  for (const c of p) need[c] = (need[c] || 0) + 1;
  let left = 0, right = 0, valid = 0;
  while (right < s.length) {
    const c = s[right++];
    if (need[c] != null) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) valid++;
    }
    while (right - left >= p.length) {
      if (valid === Object.keys(need).length) res.push(left);
      const d = s[left++];
      if (need[d] != null) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Sliding window of size p.length; track counts and valid matches.",
    link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
  },
  {
    id: 79,
    title: "Merge K Sorted Lists",
    difficulty: "hard",
    description: "Merge k sorted linked lists into one sorted list.",
    tags: ["LinkedList", "Heap"],
    companies: ["Facebook", "Google"],
    code: `function mergeKLists(lists) {
  const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
  const pq = new MinPriorityQueue({ priority: node => node.val });
  for (const node of lists) {
    if (node) pq.enqueue(node);
  }
  const dummy = { val: 0, next: null }, tail = dummy;
  while (!pq.isEmpty()) {
    const smallest = pq.dequeue().element;
    tail.next = smallest;
    tail = tail.next;
    if (smallest.next) pq.enqueue(smallest.next);
  }
  return dummy.next;
}`,
    complexity: `// Time: O(n log k)
// Space: O(k)`,
    explanation:
      "Push heads into min-heap; repeatedly extract smallest and enqueue its next.",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
  {
    id: 80,
    title: "Binary Tree Level Order Traversal",
    difficulty: "easy",
    description: "Return values of nodes level by level in a binary tree.",
    tags: ["Trees", "BFS"],
    companies: ["Google", "Amazon"],
    code: `function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const size = queue.length, level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use a queue for BFS; process nodes level by level collecting values.",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },
  {
    id: 81,
    title: "Reorder List",
    difficulty: "medium",
    description: "Reorder linked list to L0→Ln→L1→Ln-1→… in-place.",
    tags: ["LinkedList", "Two Pointers"],
    companies: ["Google", "Amazon"],
    code: `function reorderList(head) {
  if (!head || !head.next) return;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  let first = head, second = prev;
  while (second) {
    [first.next, second.next, first, second] =
      [second, first.next, first.next, second.next];
  }
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Split list, reverse second half, then merge two halves alternately.",
    link: "https://leetcode.com/problems/reorder-list/",
  },
  {
    id: 82,
    title: "K Closest Points to Origin",
    difficulty: "medium",
    description: "Return k points closest to (0,0) using heap or quickselect.",
    tags: ["Heap", "Math"],
    companies: ["Google", "Amazon"],
    code: `function kClosest(points, k) {
  const dist = ([x, y]) => x*x + y*y;
  points.sort((a, b) => dist(a) - dist(b));
  return points.slice(0, k);
}`,
    complexity: `// Time: O(n log n)
// Space: O(log n)`,
    explanation: "Sort by squared distance to origin and take first k points.",
    link: "https://leetcode.com/problems/k-closest-points-to-origin/",
  },
  {
    id: 83,
    title: "Find Duplicate File in System",
    difficulty: "medium",
    description:
      "Group files with identical content given directory info strings.",
    tags: ["HashMap", "Strings"],
    companies: ["Google"],
    code: `function findDuplicate(paths) {
  const map = {};
  for (const entry of paths) {
    const parts = entry.split(' ');
    const root = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const [name, content] = parts[i].split('(');
      const key = content.slice(0, -1);
      map[key] = map[key] || [];
      map[key].push(\`\${root}/\${name}\`);
    }
  }
  return Object.values(map).filter(group => group.length > 1);
}`,
    complexity: `// Time: O(n·k)
// Space: O(n·k)`,
    explanation:
      "Parse each path; map file content to full paths; filter duplicates.",
    link: "https://leetcode.com/problems/find-duplicate-file-in-system/",
  },
  {
    id: 84,
    title: "Spiral Matrix",
    difficulty: "medium",
    description: "Return all elements of a matrix in spiral order.",
    tags: ["Matrix", "Simulation"],
    companies: ["Amazon", "Microsoft"],
    code: `function spiralOrder(matrix) {
  if (!matrix.length) return [];
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) res.push(matrix[top][j]);
    top++;
    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let j = right; j >= left; j--) res.push(matrix[bottom][j]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
      left++;
    }
  }
  return res;
}`,
    complexity: `// Time: O(m·n)
// Space: O(1)`,
    explanation:
      "Use four boundaries and traverse top, right, bottom, left in loops.",
    link: "https://leetcode.com/problems/spiral-matrix/",
  },
  {
    id: 85,
    title: "Permutations",
    difficulty: "medium",
    description: "Generate all permutations of an array of distinct integers.",
    tags: ["Backtracking"],
    companies: ["Amazon", "Google"],
    code: `function permute(nums) {
  const res = [];
  function backtrack(path = [], used = {}) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (const n of nums) {
      if (used[n]) continue;
      used[n] = true;
      path.push(n);
      backtrack(path, used);
      path.pop();
      used[n] = false;
    }
  }
  backtrack();
  return res;
}`,
    complexity: `// Time: O(n!·n)
// Space: O(n)`,
    explanation:
      "Backtrack building paths and marking used elements until full length.",
    link: "https://leetcode.com/problems/permutations/",
  },
  {
    id: 86,
    title: "Subsets",
    difficulty: "easy",
    description: "Return all possible subsets of a distinct integer array.",
    tags: ["Backtracking", "Bit Manipulation"],
    companies: ["Microsoft", "Amazon"],
    code: `function subsets(nums) {
  const res = [];
  function backtrack(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
    complexity: `// Time: O(2^n·n)
// Space: O(n)`,
    explanation:
      "Backtrack by including or excluding each element, collect all paths.",
    link: "https://leetcode.com/problems/subsets/",
  },
  {
    id: 87,
    title: "Combination Sum",
    difficulty: "medium",
    description:
      "Find unique combinations that sum to target with unlimited repeats.",
    tags: ["Backtracking", "DFS"],
    companies: ["Amazon", "Google"],
    code: `function combinationSum(candidates, target) {
  const res = [];
  function dfs(start, sum, path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, sum + candidates[i], path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}`,
    complexity: `// Time: O(n^(target/min))
// Space: O(target/min)`,
    explanation:
      "Backtrack by adding candidates and pruning when sum exceeds target.",
    link: "https://leetcode.com/problems/combination-sum/",
  },
  {
    id: 88,
    title: "Largest Rectangle in Histogram",
    difficulty: "hard",
    description: "Compute largest rectangle area in a histogram.",
    tags: ["Stack"],
    companies: ["Amazon", "Google"],
    code: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Maintain a stack of indices with increasing heights; compute areas on pop.",
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
  },
  {
    id: 89,
    title: "Valid Sudoku",
    difficulty: "medium",
    description: "Determine if a 9×9 board is a valid Sudoku configuration.",
    tags: ["HashMap", "Matrix"],
    companies: ["Google", "Amazon"],
    code: `function isValidSudoku(board) {
  const rows = [], cols = [], boxes = [];
  for (let i = 0; i < 9; i++) {
    rows.push(new Set());
    cols.push(new Set());
    boxes.push(new Set());
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === '.') continue;
      const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (rows[i].has(num) || cols[j].has(num) || boxes[b].has(num)) {
        return false;
      }
      rows[i].add(num);
      cols[j].add(num);
      boxes[b].add(num);
    }
  }
  return true;
}`,
    complexity: `// Time: O(1)
// Space: O(1)`,
    explanation:
      "Use sets to track seen numbers in each row, column, and 3×3 box.",
    link: "https://leetcode.com/problems/valid-sudoku/",
  },
  {
    id: 90,
    title: "Search in Rotated Sorted Array",
    difficulty: "medium",
    description: "Find target in a rotated sorted array in O(log n).",
    tags: ["Binary Search"],
    companies: ["Apple", "Google"],
    code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}`,
    complexity: `// Time: O(log n)
// Space: O(1)`,
    explanation:
      "Binary search by determining which half is sorted and where target lies.",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    id: 91,
    title: "Jump Game",
    difficulty: "medium",
    description:
      "Determine if you can reach last index given max jump lengths.",
    tags: ["Greedy"],
    companies: ["Microsoft", "Amazon"],
    code: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Track furthest reachable index; fail if current index exceeds it.",
    link: "https://leetcode.com/problems/jump-game/",
  },
  {
    id: 92,
    title: "Jump Game II",
    difficulty: "hard",
    description: "Find minimum jumps to reach last index.",
    tags: ["Greedy", "BFS"],
    companies: ["Google", "Amazon"],
    code: `function jump(nums) {
  let jumps = 0, currentEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
}`,
    complexity: `// Time: O(n)
// Space: O(1)`,
    explanation:
      "Greedy layers: extend farthest reachable and increase jump count at boundary.",
    link: "https://leetcode.com/problems/jump-game-ii/",
  },
  {
    id: 93,
    title: "Unique Paths",
    difficulty: "medium",
    description:
      "Count paths from top-left to bottom-right in grid moving only right or down.",
    tags: ["DP", "Math"],
    companies: ["Google", "Facebook"],
    code: `function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
    complexity: `// Time: O(m·n)
// Space: O(n)`,
    explanation:
      "DP in-place: dp[j] holds number of ways to reach cell in current row.",
    link: "https://leetcode.com/problems/unique-paths/",
  },
  {
    id: 94,
    title: "Unique Paths II",
    difficulty: "medium",
    description: "Count paths avoiding obstacles in a grid.",
    tags: ["DP", "Matrix"],
    companies: ["Google", "Amazon"],
    code: `function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length, n = obstacleGrid[0].length;
  const dp = Array(n).fill(0);
  dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) dp[j] = 0;
      else if (j > 0) dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
    complexity: `// Time: O(m·n)
// Space: O(n)`,
    explanation:
      "DP in one array; zero out when obstacle, accumulate from left otherwise.",
    link: "https://leetcode.com/problems/unique-paths-ii/",
  },
  {
    id: 95,
    title: "Decode Ways",
    difficulty: "medium",
    description: "Count ways to decode numeric string into letters.",
    tags: ["DP", "Strings"],
    companies: ["Google", "Facebook"],
    code: `function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  const dp = [1, 1];
  for (let i = 2; i <= s.length; i++) {
    let ways = 0;
    const one = parseInt(s.slice(i - 1, i));
    const two = parseInt(s.slice(i - 2, i));
    if (one >= 1) ways += dp[i - 1];
    if (two >= 10 && two <= 26) ways += dp[i - 2];
    dp[i] = ways;
  }
  return dp[s.length];
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "DP where dp[i] = ways ending at i; consider one- and two-digit decodings.",
    link: "https://leetcode.com/problems/decode-ways/",
  },
  {
    id: 96,
    title: "Flatten Binary Tree to Linked List",
    difficulty: "medium",
    description:
      "Transform tree in-place to a right-skewed linked list by preorder.",
    tags: ["Trees", "DFS"],
    companies: ["Google", "Amazon"],
    code: `function flatten(root) {
  let prev = null;
  function dfs(node) {
    if (!node) return;
    dfs(node.right);
    dfs(node.left);
    node.right = prev;
    node.left = null;
    prev = node;
  }
  dfs(root);
}`,
    complexity: `// Time: O(n)
// Space: O(n) (recursion)`,
    explanation:
      "Reverse preorder: recurse right, left, rewire right pointer to previous node.",
    link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
  },
  {
    id: 97,
    title: "Partition Equal Subset Sum",
    difficulty: "medium",
    description:
      "Determine if array can be split into two subsets with equal sum.",
    tags: ["DP", "Knapsack"],
    companies: ["Amazon", "Google"],
    code: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}`,
    complexity: `// Time: O(n·sum)
// Space: O(sum)`,
    explanation:
      "0/1 knapsack: can we fill capacity sum/2 using elements once?",
    link: "https://leetcode.com/problems/partition-equal-subset-sum/",
  },
  {
    id: 98,
    title: "Insert Interval",
    difficulty: "medium",
    description: "Insert new interval and merge overlapping ones.",
    tags: ["Arrays", "Intervals"],
    companies: ["Google", "Microsoft"],
    code: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < intervals.length) res.push(intervals[i++]);
  return res;
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Append non-overlapping, merge overlaps with newInterval, then rest.",
    link: "https://leetcode.com/problems/insert-interval/",
  },
  {
    id: 99,
    title: "Palindromic Substrings",
    difficulty: "medium",
    description: "Count palindromic substrings in a string.",
    tags: ["Strings", "Center Expansion"],
    companies: ["Google", "Amazon"],
    code: `function countSubstrings(s) {
  let count = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}`,
    complexity: `// Time: O(n^2)
// Space: O(1)`,
    explanation:
      "Expand around each center (odd and even) counting valid palindromes.",
    link: "https://leetcode.com/problems/palindromic-substrings/",
  },
  {
    id: 100,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "medium",
    description: "Evaluate arithmetic expression in Reverse Polish Notation.",
    tags: ["Stack"],
    companies: ["Amazon", "Google"],
    code: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (!['+', '-', '*', '/'].includes(t)) {
      stack.push(Number(t));
    } else {
      const b = stack.pop(), a = stack.pop();
      if (t === '+') stack.push(a + b);
      if (t === '-') stack.push(a - b);
      if (t === '*') stack.push(a * b);
      if (t === '/') stack.push((a / b) | 0);
    }
  }
  return stack.pop();
}`,
    complexity: `// Time: O(n)
// Space: O(n)`,
    explanation:
      "Use stack: push numbers, on operator pop two, compute, push result.",
    link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
  },
];

// ...existing code...
function renderChallenge(c) {
  const tagSpans = c.tags
    .map(
      (t) =>
        `<span class="tag px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">${t}</span>`
    )
    .join("\n                ");

  const companySpan = c.companies.join(", ");

  return `
<!-- Challenge ${c.id} -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 challenge-card border border-gray-200 dark:border-gray-700"
     data-id="${c.id}" data-category="${c.tags[0] || ""}" data-company="${
    c.companies[0] || ""
  }">
  <div class="p-6">
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white challenge-title">${
            c.id
          }. ${c.title}</h3>
          <span class="text-xs px-2 py-1 rounded-full difficulty-${c.difficulty.toLowerCase()}">
            ${c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1)}
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mt-1">${c.description}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          ${tagSpans}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 mark-complete-btn" data-id="${
          c.id
        }" title="Mark as Complete">
          <i class="far fa-check-circle"></i>
        </button>
      </div>
    </div>
    <div class="mt-4 flex justify-between items-center">
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <i class="fas fa-building"></i><span>${companySpan}</span>
      </div>
      <button class="solution-toggle-btn flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-medium" data-id="${
        c.id
      }">
        <i class="fas fa-chevron-down mr-2 transition-transform"></i>
        <span>View Solution</span>
      </button>
    </div>
    <div class="solution-toggle mt-4 hidden">
      <div class="solution-content bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div class="flex gap-4 mb-4">
          <button class="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-medium">Optimal</button>
        </div>
        <h4 class="font-medium text-gray-800 dark:text-white mb-2">Optimal Solution:</h4>
        <pre class="bg-gray-800 dark:bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>${
          c.code
        }

${c.complexity}</code></pre>
        <div class="mt-4">
          <h4 class="font-medium text-gray-800 dark:text-white mb-2">Explanation:</h4>
          <p class="text-gray-700 dark:text-gray-300">${c.explanation}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <h4 class="font-medium text-gray-800 dark:text-white mb-2">Related Links:</h4>
          <div class="flex flex-wrap gap-2">
            <a href="${
              c.link
            }" class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm flex items-center gap-2" target="_blank">
              <i class="fas fa-external-link-alt"></i> LeetCode Problem
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

const html = challenges.map(renderChallenge).join("\n");
fs.writeFileSync("public/templates/output.html", html);
console.log(
  "✅ output.html generated with",
  challenges.length,
  "challenge cards."
);
