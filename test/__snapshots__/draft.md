## insert "x" at 0
edit: "x# T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["x# T"]
undo: original
redo: edit
uncheck b: "x# T\n\nAa b.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["x# T"]
change b: "x# T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["x# T"]
## insert "x" at 1
edit: "#x T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["#x T"]
undo: original
redo: edit
uncheck b: "#x T\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["#x T"]
change b: "#x T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["#x T"]
## insert "x" at 2
edit: "# xT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["# xT"]
undo: original
redo: edit
uncheck b: "# xT\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["# xT"]
change b: "# xT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["# xT"]
## insert "x" at 3
edit: "# Tx\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["# Tx"]
undo: original
redo: edit
uncheck b: "# Tx\n\nAa b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["# Tx"]
change b: "# Tx\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["# Tx"]
## insert "x" at 4
edit: "# T\nx\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@6-11 b@13-18 c@20-25 | sep 3-4 5-6 11-13 18-20 | authored ["x"]
undo: original
redo: edit
uncheck b: "# T\nx\nAa b.\n\nCc d." | title@0-3 a@6-11 c@13-18 | sep 3-4 5-6 11-13 | authored ["x"]
change b: "# T\nx\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@6-11 b@13-19 c@21-26 | sep 3-4 5-6 11-13 19-21 | authored ["x"]
## insert "x" at 5
edit: "# T\n\nxAa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["xAa b."]
undo: original
redo: edit
uncheck b: "# T\n\nxAa b.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["xAa b."]
change b: "# T\n\nxAa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["xAa b."]
## insert "x" at 6
edit: "# T\n\nAxa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Axa b."]
undo: original
redo: edit
uncheck b: "# T\n\nAxa b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Axa b."]
change b: "# T\n\nAxa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Axa b."]
## insert "x" at 7
edit: "# T\n\nAax b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aax b."]
undo: original
redo: edit
uncheck b: "# T\n\nAax b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aax b."]
change b: "# T\n\nAax b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aax b."]
## insert "x" at 8
edit: "# T\n\nAa xb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa xb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa xb.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa xb."]
change b: "# T\n\nAa xb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa xb."]
## insert "x" at 9
edit: "# T\n\nAa bx.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa bx."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bx.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa bx."]
change b: "# T\n\nAa bx.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa bx."]
## insert "x" at 10
edit: "# T\n\nAa b.x\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa b.x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.x\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa b.x"]
change b: "# T\n\nAa b.x\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b.x"]
## insert "x" at 11
edit: "# T\n\nAa b.\nx\nBb c.\n\nCc d." | title@0-3 a@5-10 b@13-18 c@20-25 | sep 3-5 10-11 12-13 18-20 | authored ["x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 12-14 | authored ["x"]
change b: "# T\n\nAa b.\nx\nNew b.\n\nCc d." | title@0-3 a@5-10 b@13-19 c@21-26 | sep 3-5 10-11 12-13 19-21 | authored ["x"]
## insert "x" at 12
edit: "# T\n\nAa b.\n\nxBb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 o=13-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["xBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxBb c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["xBb c."]
change b: "# T\n\nAa b.\n\nxBb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["xBb c."]
## insert "x" at 13
edit: "# T\n\nAa b.\n\nBxb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bxb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBxb c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bxb c."]
change b: "# T\n\nAa b.\n\nBxb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bxb c."]
## insert "x" at 14
edit: "# T\n\nAa b.\n\nBbx c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bbx c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbx c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bbx c."]
change b: "# T\n\nAa b.\n\nBbx c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bbx c."]
## insert "x" at 15
edit: "# T\n\nAa b.\n\nBb xc.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb xc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb xc.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb xc."]
change b: "# T\n\nAa b.\n\nBb xc.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb xc."]
## insert "x" at 16
edit: "# T\n\nAa b.\n\nBb cx.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb cx."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cx.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb cx."]
change b: "# T\n\nAa b.\n\nBb cx.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb cx."]
## insert "x" at 17
edit: "# T\n\nAa b.\n\nBb c.x\n\nCc d." | title@0-3 a@5-10 b*@12-18 o=12-17 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c.x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c.x\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c.x"]
change b: "# T\n\nAa b.\n\nBb c.x\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c.x"]
## insert "x" at 18
edit: "# T\n\nAa b.\n\nBb c.\nx\nCc d." | title@0-3 a@5-10 b@12-17 c@20-25 | sep 3-5 10-12 17-18 19-20 | authored ["x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-11 12-13 | authored ["x"]
change b: "# T\n\nAa b.\n\nNew b.\nx\nCc d." | title@0-3 a@5-10 b@12-18 c@21-26 | sep 3-5 10-12 18-19 20-21 | authored ["x"]
## insert "x" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\nxCc d." | title@0-3 a@5-10 b@12-17 c*@19-25 o=20-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["xCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxCc d." | title@0-3 a@5-10 c*@12-18 o=13-18 g="Cc d." | sep 3-5 10-12 | authored ["xCc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nxCc d." | title@0-3 a@5-10 b@12-18 c*@20-26 o=21-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["xCc d."]
## insert "x" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nCxc d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cxc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCxc d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cxc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCxc d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cxc d."]
## insert "x" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCcx d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccx d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcx d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Ccx d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcx d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccx d."]
## insert "x" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc xd." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc xd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc xd." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc xd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc xd." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc xd."]
## insert "x" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc dx." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc dx."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc dx." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc dx."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc dx." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc dx."]
## insert "x" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.x" | title@0-3 a@5-10 b@12-17 c*@19-25 o=19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d.x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.x" | title@0-3 a@5-10 c*@12-18 o=12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc d.x"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.x" | title@0-3 a@5-10 b@12-18 c*@20-26 o=20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d.x"]
## insert " " at 0
edit: " # T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored [" # T"]
undo: original
redo: edit
uncheck b: " # T\n\nAa b.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored [" # T"]
change b: " # T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=1-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored [" # T"]
## insert " " at 1
edit: "#  T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["#  T"]
undo: original
redo: edit
uncheck b: "#  T\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["#  T"]
change b: "#  T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["#  T"]
## insert " " at 2
edit: "#  T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["#  T"]
undo: original
redo: edit
uncheck b: "#  T\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["#  T"]
change b: "#  T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["#  T"]
## insert " " at 3
edit: "# T \n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["# T "]
undo: original
redo: edit
uncheck b: "# T \n\nAa b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["# T "]
change b: "# T \n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["# T "]
## insert " " at 4
edit: "# T\n \nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@6-11 b@13-18 c@20-25 | sep 3-4 5-6 11-13 18-20 | authored [" "]
undo: original
redo: edit
uncheck b: "# T\n \nAa b.\n\nCc d." | title@0-3 a@6-11 c@13-18 | sep 3-4 5-6 11-13 | authored [" "]
change b: "# T\n \nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@6-11 b@13-19 c@21-26 | sep 3-4 5-6 11-13 19-21 | authored [" "]
## insert " " at 5
edit: "# T\n\n Aa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored [" Aa b."]
undo: original
redo: edit
uncheck b: "# T\n\n Aa b.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored [" Aa b."]
change b: "# T\n\n Aa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=6-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored [" Aa b."]
## insert " " at 6
edit: "# T\n\nA a b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["A a b."]
undo: original
redo: edit
uncheck b: "# T\n\nA a b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["A a b."]
change b: "# T\n\nA a b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["A a b."]
## insert " " at 7
edit: "# T\n\nAa  b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa  b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa  b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa  b."]
change b: "# T\n\nAa  b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa  b."]
## insert " " at 8
edit: "# T\n\nAa  b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa  b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa  b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa  b."]
change b: "# T\n\nAa  b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa  b."]
## insert " " at 9
edit: "# T\n\nAa b .\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa b ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b .\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa b ."]
change b: "# T\n\nAa b .\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b ."]
## insert " " at 10
edit: "# T\n\nAa b. \n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa b. "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b. \n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa b. "]
change b: "# T\n\nAa b. \n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b. "]
## insert " " at 11
edit: "# T\n\nAa b.\n \nBb c.\n\nCc d." | title@0-3 a@5-10 b@13-18 c@20-25 | sep 3-5 10-11 12-13 18-20 | authored [" "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n \n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 12-14 | authored [" "]
change b: "# T\n\nAa b.\n \nNew b.\n\nCc d." | title@0-3 a@5-10 b@13-19 c@21-26 | sep 3-5 10-11 12-13 19-21 | authored [" "]
## insert " " at 12
edit: "# T\n\nAa b.\n\n Bb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 o=13-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored [" Bb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n Bb c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored [" Bb c."]
change b: "# T\n\nAa b.\n\n Bb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored [" Bb c."]
## insert " " at 13
edit: "# T\n\nAa b.\n\nB b c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["B b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB b c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["B b c."]
change b: "# T\n\nAa b.\n\nB b c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["B b c."]
## insert " " at 14
edit: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
change b: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
## insert " " at 15
edit: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
change b: "# T\n\nAa b.\n\nBb  c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb  c."]
## insert " " at 16
edit: "# T\n\nAa b.\n\nBb c .\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c .\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c ."]
change b: "# T\n\nAa b.\n\nBb c .\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c ."]
## insert " " at 17
edit: "# T\n\nAa b.\n\nBb c. \n\nCc d." | title@0-3 a@5-10 b*@12-18 o=12-17 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c. "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c. \n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c. "]
change b: "# T\n\nAa b.\n\nBb c. \n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c. "]
## insert " " at 18
edit: "# T\n\nAa b.\n\nBb c.\n \nCc d." | title@0-3 a@5-10 b@12-17 c@20-25 | sep 3-5 10-12 17-18 19-20 | authored [" "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n \nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-11 12-13 | authored [" "]
change b: "# T\n\nAa b.\n\nNew b.\n \nCc d." | title@0-3 a@5-10 b@12-18 c@21-26 | sep 3-5 10-12 18-19 20-21 | authored [" "]
## insert " " at 19
edit: "# T\n\nAa b.\n\nBb c.\n\n Cc d." | title@0-3 a@5-10 b@12-17 c*@19-25 o=20-25 g="Cc d." | sep 3-5 10-12 17-19 | authored [" Cc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n Cc d." | title@0-3 a@5-10 c*@12-18 o=13-18 g="Cc d." | sep 3-5 10-12 | authored [" Cc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\n Cc d." | title@0-3 a@5-10 b@12-18 c*@20-26 o=21-26 g="Cc d." | sep 3-5 10-12 18-20 | authored [" Cc d."]
## insert " " at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nC c d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC c d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["C c d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC c d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C c d."]
## insert " " at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCc  d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc  d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc  d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc  d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc  d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc  d."]
## insert " " at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc  d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc  d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc  d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc  d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc  d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc  d."]
## insert " " at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d ." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d ." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc d ."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d ." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d ."]
## insert " " at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d. " | title@0-3 a@5-10 b@12-17 c*@19-25 o=19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d. "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d. " | title@0-3 a@5-10 c*@12-18 o=12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc d. "]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d. " | title@0-3 a@5-10 b@12-18 c*@20-26 o=20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d. "]
## insert "\n" at 0
edit: "\n# T\n\nAa b.\n\nBb c.\n\nCc d." | title@1-4 a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "\n# T\n\nAa b.\n\nCc d." | title@1-4 a@6-11 c@13-18 | sep 4-6 11-13 | authored ["\n"]
change b: "\n# T\n\nAa b.\n\nNew b.\n\nCc d." | title@1-4 a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["\n"]
## insert "\n" at 1
edit: "#\n T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["#\n T"]
undo: original
redo: edit
uncheck b: "#\n T\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["#\n T"]
change b: "#\n T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["#\n T"]
## insert "\n" at 2
edit: "# \nT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["# \nT"]
undo: original
redo: edit
uncheck b: "# \nT\n\nAa b.\n\nCc d." | title*@0-4 g="# T" a@6-11 c@13-18 | sep 4-6 11-13 | authored ["# \nT"]
change b: "# \nT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["# \nT"]
## insert "\n" at 3
edit: "# T\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@6-11 b@13-18 c@20-25 | sep 4-6 11-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\nAa b.\n\nCc d." | title@0-3 a@6-11 c@13-18 | sep 4-6 11-13 | authored ["\n"]
change b: "# T\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@6-11 b@13-19 c@21-26 | sep 4-6 11-13 19-21 | authored ["\n"]
## insert "\n" at 4
edit: "# T\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@6-11 b@13-18 c@20-25 | sep 3-4 5-6 11-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\nAa b.\n\nCc d." | title@0-3 a@6-11 c@13-18 | sep 3-4 5-6 11-13 | authored ["\n"]
change b: "# T\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@6-11 b@13-19 c@21-26 | sep 3-4 5-6 11-13 19-21 | authored ["\n"]
## insert "\n" at 5
edit: "# T\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@6-11 b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\nAa b.\n\nCc d." | title@0-3 a@6-11 c@13-18 | sep 3-5 11-13 | authored ["\n"]
change b: "# T\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@6-11 b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["\n"]
## insert "\n" at 6
edit: "# T\n\nA\na b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["A\na b."]
undo: original
redo: edit
uncheck b: "# T\n\nA\na b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["A\na b."]
change b: "# T\n\nA\na b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["A\na b."]
## insert "\n" at 7
edit: "# T\n\nAa\n b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa\n b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa\n b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa\n b."]
change b: "# T\n\nAa\n b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa\n b."]
## insert "\n" at 8
edit: "# T\n\nAa \nb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa \nb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa \nb.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa \nb."]
change b: "# T\n\nAa \nb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa \nb."]
## insert "\n" at 9
edit: "# T\n\nAa b\n.\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["Aa b\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa b\n."]
change b: "# T\n\nAa b\n.\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b\n."]
## insert "\n" at 10
edit: "# T\n\nAa b.\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@13-18 c@20-25 | sep 3-5 11-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["\n"]
change b: "# T\n\nAa b.\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@13-19 c@21-26 | sep 3-5 11-13 19-21 | authored ["\n"]
## insert "\n" at 11
edit: "# T\n\nAa b.\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@13-18 c@20-25 | sep 3-5 10-11 12-13 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 12-14 | authored ["\n"]
change b: "# T\n\nAa b.\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@13-19 c@21-26 | sep 3-5 10-11 12-13 19-21 | authored ["\n"]
## insert "\n" at 12
edit: "# T\n\nAa b.\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@13-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-12 | authored ["\n"]
change b: "# T\n\nAa b.\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@13-19 c@21-26 | sep 3-5 10-12 19-21 | authored ["\n"]
## insert "\n" at 13
edit: "# T\n\nAa b.\n\nB\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["B\nb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB\nb c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["B\nb c."]
change b: "# T\n\nAa b.\n\nB\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["B\nb c."]
## insert "\n" at 14
edit: "# T\n\nAa b.\n\nBb\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb\n c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb\n c.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb\n c."]
change b: "# T\n\nAa b.\n\nBb\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb\n c."]
## insert "\n" at 15
edit: "# T\n\nAa b.\n\nBb \nc.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb \nc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb \nc.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb \nc."]
change b: "# T\n\nAa b.\n\nBb \nc.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb \nc."]
## insert "\n" at 16
edit: "# T\n\nAa b.\n\nBb c\n.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c\n.\n\nCc d." | title@0-3 a@5-10 c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c\n."]
change b: "# T\n\nAa b.\n\nBb c\n.\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@20-25 | sep 3-5 10-12 18-20 | authored ["Bb c\n."]
## insert "\n" at 17
edit: "# T\n\nAa b.\n\nBb c.\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@20-25 | sep 3-5 10-12 18-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@21-26 | sep 3-5 10-12 19-21 | authored ["\n"]
## insert "\n" at 18
edit: "# T\n\nAa b.\n\nBb c.\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@20-25 | sep 3-5 10-12 17-18 19-20 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-11 12-13 | authored ["\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@21-26 | sep 3-5 10-12 18-19 20-21 | authored ["\n"]
## insert "\n" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@20-25 | sep 3-5 10-12 17-19 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-12 | authored ["\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@21-26 | sep 3-5 10-12 18-20 | authored ["\n"]
## insert "\n" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nC\nc d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C\nc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC\nc d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["C\nc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC\nc d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C\nc d."]
## insert "\n" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCc\n d." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc\n d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc\n d." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc\n d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc\n d." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc\n d."]
## insert "\n" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc \nd." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc \nd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc \nd." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc \nd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc \nd." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc \nd."]
## insert "\n" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d\n." | title@0-3 a@5-10 b@12-17 c*@19-25 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d\n." | title@0-3 a@5-10 c*@12-18 g="Cc d." | sep 3-5 10-12 | authored ["Cc d\n."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d\n." | title@0-3 a@5-10 b@12-18 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d\n."]
## insert "\n" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.\n" | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.\n" | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored ["\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.\n" | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["\n"]
## insert "\n\n" at 0
edit: "\n\n# T\n\nAa b.\n\nBb c.\n\nCc d." | title@2-5 a@7-12 b@14-19 c@21-26 | sep 5-7 12-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "\n\n# T\n\nAa b.\n\nCc d." | title@2-5 a@7-12 c@14-19 | sep 5-7 12-14 | authored ["\n\n"]
change b: "\n\n# T\n\nAa b.\n\nNew b.\n\nCc d." | title@2-5 a@7-12 b@14-20 c@22-27 | sep 5-7 12-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 1
edit: "#\n\n T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-5 g="# T" a@7-12 b@14-19 c@21-26 | sep 5-7 12-14 19-21 | authored ["#\n\n T"]
undo: original
redo: edit
uncheck b: "#\n\n T\n\nAa b.\n\nCc d." | title*@0-5 g="# T" a@7-12 c@14-19 | sep 5-7 12-14 | authored ["#\n\n T"]
change b: "#\n\n T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-5 g="# T" a@7-12 b@14-20 c@22-27 | sep 5-7 12-14 20-22 | authored ["#\n\n T"]
## insert "\n\n" at 2
edit: "# \n\nT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-5 g="# T" a@7-12 b@14-19 c@21-26 | sep 5-7 12-14 19-21 | authored ["# \n\nT"]
undo: original
redo: edit
uncheck b: "# \n\nT\n\nAa b.\n\nCc d." | title*@0-5 g="# T" a@7-12 c@14-19 | sep 5-7 12-14 | authored ["# \n\nT"]
change b: "# \n\nT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-5 g="# T" a@7-12 b@14-20 c@22-27 | sep 5-7 12-14 20-22 | authored ["# \n\nT"]
## insert "\n\n" at 3
edit: "# T\n\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@7-12 b@14-19 c@21-26 | sep 5-7 12-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\n\nAa b.\n\nCc d." | title@0-3 a@7-12 c@14-19 | sep 5-7 12-14 | authored ["\n\n"]
change b: "# T\n\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@7-12 b@14-20 c@22-27 | sep 5-7 12-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 4
edit: "# T\n\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@7-12 b@14-19 c@21-26 | sep 3-4 6-7 12-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\n\nAa b.\n\nCc d." | title@0-3 a@7-12 c@14-19 | sep 3-4 6-7 12-14 | authored ["\n\n"]
change b: "# T\n\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@7-12 b@14-20 c@22-27 | sep 3-4 6-7 12-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 5
edit: "# T\n\n\n\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@7-12 b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\n\n\nAa b.\n\nCc d." | title@0-3 a@7-12 c@14-19 | sep 3-5 12-14 | authored ["\n\n"]
change b: "# T\n\n\n\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@7-12 b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 6
edit: "# T\n\nA\n\na b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["A\n\na b."]
undo: original
redo: edit
uncheck b: "# T\n\nA\n\na b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["A\n\na b."]
change b: "# T\n\nA\n\na b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["A\n\na b."]
## insert "\n\n" at 7
edit: "# T\n\nAa\n\n b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["Aa\n\n b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa\n\n b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aa\n\n b."]
change b: "# T\n\nAa\n\n b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["Aa\n\n b."]
## insert "\n\n" at 8
edit: "# T\n\nAa \n\nb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["Aa \n\nb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa \n\nb.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aa \n\nb."]
change b: "# T\n\nAa \n\nb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["Aa \n\nb."]
## insert "\n\n" at 9
edit: "# T\n\nAa b\n\n.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["Aa b\n\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n\n.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aa b\n\n."]
change b: "# T\n\nAa b\n\n.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["Aa b\n\n."]
## insert "\n\n" at 10
edit: "# T\n\nAa b.\n\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 12-14 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 11
edit: "# T\n\nAa b.\n\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@14-19 c@21-26 | sep 3-5 10-11 13-14 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\n\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-11 13-15 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@14-20 c@22-27 | sep 3-5 10-11 13-14 20-22 | authored ["\n\n"]
## insert "\n\n" at 12
edit: "# T\n\nAa b.\n\n\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@14-19 c@21-26 | sep 3-5 10-12 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\n\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@14-20 c@22-27 | sep 3-5 10-12 20-22 | authored ["\n\n"]
## insert "\n\n" at 13
edit: "# T\n\nAa b.\n\nB\n\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["B\n\nb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB\n\nb c.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["B\n\nb c."]
change b: "# T\n\nAa b.\n\nB\n\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["B\n\nb c."]
## insert "\n\n" at 14
edit: "# T\n\nAa b.\n\nBb\n\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb\n\n c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb\n\n c.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb\n\n c."]
change b: "# T\n\nAa b.\n\nBb\n\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb\n\n c."]
## insert "\n\n" at 15
edit: "# T\n\nAa b.\n\nBb \n\nc.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb \n\nc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb \n\nc.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb \n\nc."]
change b: "# T\n\nAa b.\n\nBb \n\nc.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb \n\nc."]
## insert "\n\n" at 16
edit: "# T\n\nAa b.\n\nBb c\n\n.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb c\n\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c\n\n.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb c\n\n."]
change b: "# T\n\nAa b.\n\nBb c\n\n.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bb c\n\n."]
## insert "\n\n" at 17
edit: "# T\n\nAa b.\n\nBb c.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@21-26 | sep 3-5 10-12 19-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 12-14 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@22-27 | sep 3-5 10-12 20-22 | authored ["\n\n"]
## insert "\n\n" at 18
edit: "# T\n\nAa b.\n\nBb c.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@21-26 | sep 3-5 10-12 17-18 20-21 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 13-14 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@22-27 | sep 3-5 10-12 18-19 21-22 | authored ["\n\n"]
## insert "\n\n" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-17 c@21-26 | sep 3-5 10-12 17-19 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\n\n\nCc d." | title@0-3 a@5-10 b@12-18 c@22-27 | sep 3-5 10-12 18-20 | authored ["\n\n"]
## insert "\n\n" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nC\n\nc d." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C\n\nc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC\n\nc d." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["C\n\nc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC\n\nc d." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C\n\nc d."]
## insert "\n\n" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCc\n\n d." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc\n\n d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc\n\n d." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["Cc\n\n d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc\n\n d." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc\n\n d."]
## insert "\n\n" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc \n\nd." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc \n\nd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc \n\nd." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["Cc \n\nd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc \n\nd." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc \n\nd."]
## insert "\n\n" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d\n\n." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d\n\n."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d\n\n." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["Cc d\n\n."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d\n\n." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d\n\n."]
## insert "\n\n" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.\n\n" | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["\n\n"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.\n\n" | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored ["\n\n"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.\n\n" | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["\n\n"]
## insert "x\n\ny" at 0
edit: "x\n\ny# T\n\nAa b.\n\nBb c.\n\nCc d." | title*@3-7 o=4-7 g="# T" a@9-14 b@16-21 c@23-28 | sep 7-9 14-16 21-23 | authored ["x\n\ny# T"]
undo: original
redo: edit
uncheck b: "x\n\ny# T\n\nAa b.\n\nCc d." | title*@3-7 o=4-7 g="# T" a@9-14 c@16-21 | sep 7-9 14-16 | authored ["x\n\ny# T"]
change b: "x\n\ny# T\n\nAa b.\n\nNew b.\n\nCc d." | title*@3-7 o=4-7 g="# T" a@9-14 b@16-22 c@24-29 | sep 7-9 14-16 22-24 | authored ["x\n\ny# T"]
## insert "x\n\ny" at 1
edit: "#x\n\ny T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-7 g="# T" a@9-14 b@16-21 c@23-28 | sep 7-9 14-16 21-23 | authored ["#x\n\ny T"]
undo: original
redo: edit
uncheck b: "#x\n\ny T\n\nAa b.\n\nCc d." | title*@0-7 g="# T" a@9-14 c@16-21 | sep 7-9 14-16 | authored ["#x\n\ny T"]
change b: "#x\n\ny T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-7 g="# T" a@9-14 b@16-22 c@24-29 | sep 7-9 14-16 22-24 | authored ["#x\n\ny T"]
## insert "x\n\ny" at 2
edit: "# x\n\nyT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-7 g="# T" a@9-14 b@16-21 c@23-28 | sep 7-9 14-16 21-23 | authored ["# x\n\nyT"]
undo: original
redo: edit
uncheck b: "# x\n\nyT\n\nAa b.\n\nCc d." | title*@0-7 g="# T" a@9-14 c@16-21 | sep 7-9 14-16 | authored ["# x\n\nyT"]
change b: "# x\n\nyT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-7 g="# T" a@9-14 b@16-22 c@24-29 | sep 7-9 14-16 22-24 | authored ["# x\n\nyT"]
## insert "x\n\ny" at 3
edit: "# Tx\n\ny\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@9-14 b@16-21 c@23-28 | sep 7-9 14-16 21-23 | authored ["# Tx\n\ny"]
undo: original
redo: edit
uncheck b: "# Tx\n\ny\n\nAa b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@9-14 c@16-21 | sep 7-9 14-16 | authored ["# Tx\n\ny"]
change b: "# Tx\n\ny\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@9-14 b@16-22 c@24-29 | sep 7-9 14-16 22-24 | authored ["# Tx\n\ny"]
## insert "x\n\ny" at 4
edit: "# T\nx\n\ny\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@9-14 b@16-21 c@23-28 | sep 3-4 8-9 14-16 21-23 | authored ["x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\nx\n\ny\nAa b.\n\nCc d." | title@0-3 a@9-14 c@16-21 | sep 3-4 8-9 14-16 | authored ["x\n\ny"]
change b: "# T\nx\n\ny\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@9-14 b@16-22 c@24-29 | sep 3-4 8-9 14-16 22-24 | authored ["x\n\ny"]
## insert "x\n\ny" at 5
edit: "# T\n\nx\n\nyAa b.\n\nBb c.\n\nCc d." | title@0-3 a*@8-14 o=9-14 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["x\n\nyAa b."]
undo: original
redo: edit
uncheck b: "# T\n\nx\n\nyAa b.\n\nCc d." | title@0-3 a*@8-14 o=9-14 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["x\n\nyAa b."]
change b: "# T\n\nx\n\nyAa b.\n\nNew b.\n\nCc d." | title@0-3 a*@8-14 o=9-14 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["x\n\nyAa b."]
## insert "x\n\ny" at 6
edit: "# T\n\nAx\n\nya b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["Ax\n\nya b."]
undo: original
redo: edit
uncheck b: "# T\n\nAx\n\nya b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["Ax\n\nya b."]
change b: "# T\n\nAx\n\nya b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["Ax\n\nya b."]
## insert "x\n\ny" at 7
edit: "# T\n\nAax\n\ny b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["Aax\n\ny b."]
undo: original
redo: edit
uncheck b: "# T\n\nAax\n\ny b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["Aax\n\ny b."]
change b: "# T\n\nAax\n\ny b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["Aax\n\ny b."]
## insert "x\n\ny" at 8
edit: "# T\n\nAa x\n\nyb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["Aa x\n\nyb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa x\n\nyb.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["Aa x\n\nyb."]
change b: "# T\n\nAa x\n\nyb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["Aa x\n\nyb."]
## insert "x\n\ny" at 9
edit: "# T\n\nAa bx\n\ny.\n\nBb c.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["Aa bx\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bx\n\ny.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["Aa bx\n\ny."]
change b: "# T\n\nAa bx\n\ny.\n\nNew b.\n\nCc d." | title@0-3 a*@5-14 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["Aa bx\n\ny."]
## insert "x\n\ny" at 10
edit: "# T\n\nAa b.x\n\ny\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@16-21 c@23-28 | sep 3-5 14-16 21-23 | authored ["Aa b.x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.x\n\ny\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." c@16-21 | sep 3-5 14-16 | authored ["Aa b.x\n\ny"]
change b: "# T\n\nAa b.x\n\ny\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@16-22 c@24-29 | sep 3-5 14-16 22-24 | authored ["Aa b.x\n\ny"]
## insert "x\n\ny" at 11
edit: "# T\n\nAa b.\nx\n\ny\nBb c.\n\nCc d." | title@0-3 a@5-10 b@16-21 c@23-28 | sep 3-5 10-11 15-16 21-23 | authored ["x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\n\ny\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-11 15-17 | authored ["x\n\ny"]
change b: "# T\n\nAa b.\nx\n\ny\nNew b.\n\nCc d." | title@0-3 a@5-10 b@16-22 c@24-29 | sep 3-5 10-11 15-16 22-24 | authored ["x\n\ny"]
## insert "x\n\ny" at 12
edit: "# T\n\nAa b.\n\nx\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 b*@15-21 o=16-21 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["x\n\nyBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nx\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["x\n\nyBb c."]
change b: "# T\n\nAa b.\n\nx\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 b*@15-21 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["x\n\nyBb c."]
## insert "x\n\ny" at 13
edit: "# T\n\nAa b.\n\nBx\n\nyb c.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bx\n\nyb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBx\n\nyb c.\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["Bx\n\nyb c."]
change b: "# T\n\nAa b.\n\nBx\n\nyb c.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bx\n\nyb c."]
## insert "x\n\ny" at 14
edit: "# T\n\nAa b.\n\nBbx\n\ny c.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bbx\n\ny c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbx\n\ny c.\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["Bbx\n\ny c."]
change b: "# T\n\nAa b.\n\nBbx\n\ny c.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bbx\n\ny c."]
## insert "x\n\ny" at 15
edit: "# T\n\nAa b.\n\nBb x\n\nyc.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb x\n\nyc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb x\n\nyc.\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb x\n\nyc."]
change b: "# T\n\nAa b.\n\nBb x\n\nyc.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb x\n\nyc."]
## insert "x\n\ny" at 16
edit: "# T\n\nAa b.\n\nBb cx\n\ny.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb cx\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cx\n\ny.\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb cx\n\ny."]
change b: "# T\n\nAa b.\n\nBb cx\n\ny.\n\nCc d." | title@0-3 a@5-10 b*@12-21 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb cx\n\ny."]
## insert "x\n\ny" at 17
edit: "# T\n\nAa b.\n\nBb c.x\n\ny\n\nCc d." | title@0-3 a@5-10 b*@12-18 o=12-17 g="Bb c." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb c.x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c.x\n\ny\n\nCc d." | title@0-3 a@5-10 c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb c.x\n\ny"]
change b: "# T\n\nAa b.\n\nBb c.x\n\ny\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@23-28 | sep 3-5 10-12 21-23 | authored ["Bb c.x\n\ny"]
## insert "x\n\ny" at 18
edit: "# T\n\nAa b.\n\nBb c.\nx\n\ny\nCc d." | title@0-3 a@5-10 b@12-17 c@23-28 | sep 3-5 10-12 17-18 22-23 | authored ["x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\n\ny\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-11 15-16 | authored ["x\n\ny"]
change b: "# T\n\nAa b.\n\nNew b.\nx\n\ny\nCc d." | title@0-3 a@5-10 b@12-18 c@24-29 | sep 3-5 10-12 18-19 23-24 | authored ["x\n\ny"]
## insert "x\n\ny" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\nx\n\nyCc d." | title@0-3 a@5-10 b@12-17 c*@22-28 o=23-28 g="Cc d." | sep 3-5 10-12 17-19 | authored ["x\n\nyCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nx\n\nyCc d." | title@0-3 a@5-10 c*@15-21 o=16-21 g="Cc d." | sep 3-5 10-12 | authored ["x\n\nyCc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nx\n\nyCc d." | title@0-3 a@5-10 b@12-18 c*@23-29 o=24-29 g="Cc d." | sep 3-5 10-12 18-20 | authored ["x\n\nyCc d."]
## insert "x\n\ny" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nCx\n\nyc d." | title@0-3 a@5-10 b@12-17 c*@19-28 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cx\n\nyc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCx\n\nyc d." | title@0-3 a@5-10 c*@12-21 g="Cc d." | sep 3-5 10-12 | authored ["Cx\n\nyc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCx\n\nyc d." | title@0-3 a@5-10 b@12-18 c*@20-29 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cx\n\nyc d."]
## insert "x\n\ny" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCcx\n\ny d." | title@0-3 a@5-10 b@12-17 c*@19-28 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccx\n\ny d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcx\n\ny d." | title@0-3 a@5-10 c*@12-21 g="Cc d." | sep 3-5 10-12 | authored ["Ccx\n\ny d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcx\n\ny d." | title@0-3 a@5-10 b@12-18 c*@20-29 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccx\n\ny d."]
## insert "x\n\ny" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc x\n\nyd." | title@0-3 a@5-10 b@12-17 c*@19-28 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc x\n\nyd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc x\n\nyd." | title@0-3 a@5-10 c*@12-21 g="Cc d." | sep 3-5 10-12 | authored ["Cc x\n\nyd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc x\n\nyd." | title@0-3 a@5-10 b@12-18 c*@20-29 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc x\n\nyd."]
## insert "x\n\ny" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc dx\n\ny." | title@0-3 a@5-10 b@12-17 c*@19-28 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc dx\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc dx\n\ny." | title@0-3 a@5-10 c*@12-21 g="Cc d." | sep 3-5 10-12 | authored ["Cc dx\n\ny."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc dx\n\ny." | title@0-3 a@5-10 b@12-18 c*@20-29 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc dx\n\ny."]
## insert "x\n\ny" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.x\n\ny" | title@0-3 a@5-10 b@12-17 c*@19-25 o=19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d.x\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.x\n\ny" | title@0-3 a@5-10 c*@12-18 o=12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc d.x\n\ny"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.x\n\ny" | title@0-3 a@5-10 b@12-18 c*@20-26 o=20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d.x\n\ny"]
## insert "x\n\n\ny" at 0
edit: "x\n\n\ny# T\n\nAa b.\n\nBb c.\n\nCc d." | title*@4-8 o=5-8 g="# T" a@10-15 b@17-22 c@24-29 | sep 8-10 15-17 22-24 | authored ["x\n\n\ny# T"]
undo: original
redo: edit
uncheck b: "x\n\n\ny# T\n\nAa b.\n\nCc d." | title*@4-8 o=5-8 g="# T" a@10-15 c@17-22 | sep 8-10 15-17 | authored ["x\n\n\ny# T"]
change b: "x\n\n\ny# T\n\nAa b.\n\nNew b.\n\nCc d." | title*@4-8 o=5-8 g="# T" a@10-15 b@17-23 c@25-30 | sep 8-10 15-17 23-25 | authored ["x\n\n\ny# T"]
## insert "x\n\n\ny" at 1
edit: "#x\n\n\ny T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-8 g="# T" a@10-15 b@17-22 c@24-29 | sep 8-10 15-17 22-24 | authored ["#x\n\n\ny T"]
undo: original
redo: edit
uncheck b: "#x\n\n\ny T\n\nAa b.\n\nCc d." | title*@0-8 g="# T" a@10-15 c@17-22 | sep 8-10 15-17 | authored ["#x\n\n\ny T"]
change b: "#x\n\n\ny T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-8 g="# T" a@10-15 b@17-23 c@25-30 | sep 8-10 15-17 23-25 | authored ["#x\n\n\ny T"]
## insert "x\n\n\ny" at 2
edit: "# x\n\n\nyT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-8 g="# T" a@10-15 b@17-22 c@24-29 | sep 8-10 15-17 22-24 | authored ["# x\n\n\nyT"]
undo: original
redo: edit
uncheck b: "# x\n\n\nyT\n\nAa b.\n\nCc d." | title*@0-8 g="# T" a@10-15 c@17-22 | sep 8-10 15-17 | authored ["# x\n\n\nyT"]
change b: "# x\n\n\nyT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-8 g="# T" a@10-15 b@17-23 c@25-30 | sep 8-10 15-17 23-25 | authored ["# x\n\n\nyT"]
## insert "x\n\n\ny" at 3
edit: "# Tx\n\n\ny\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@10-15 b@17-22 c@24-29 | sep 8-10 15-17 22-24 | authored ["# Tx\n\n\ny"]
undo: original
redo: edit
uncheck b: "# Tx\n\n\ny\n\nAa b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@10-15 c@17-22 | sep 8-10 15-17 | authored ["# Tx\n\n\ny"]
change b: "# Tx\n\n\ny\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a@10-15 b@17-23 c@25-30 | sep 8-10 15-17 23-25 | authored ["# Tx\n\n\ny"]
## insert "x\n\n\ny" at 4
edit: "# T\nx\n\n\ny\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@10-15 b@17-22 c@24-29 | sep 3-4 9-10 15-17 22-24 | authored ["x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\nx\n\n\ny\nAa b.\n\nCc d." | title@0-3 a@10-15 c@17-22 | sep 3-4 9-10 15-17 | authored ["x\n\n\ny"]
change b: "# T\nx\n\n\ny\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@10-15 b@17-23 c@25-30 | sep 3-4 9-10 15-17 23-25 | authored ["x\n\n\ny"]
## insert "x\n\n\ny" at 5
edit: "# T\n\nx\n\n\nyAa b.\n\nBb c.\n\nCc d." | title@0-3 a*@9-15 o=10-15 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["x\n\n\nyAa b."]
undo: original
redo: edit
uncheck b: "# T\n\nx\n\n\nyAa b.\n\nCc d." | title@0-3 a*@9-15 o=10-15 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["x\n\n\nyAa b."]
change b: "# T\n\nx\n\n\nyAa b.\n\nNew b.\n\nCc d." | title@0-3 a*@9-15 o=10-15 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["x\n\n\nyAa b."]
## insert "x\n\n\ny" at 6
edit: "# T\n\nAx\n\n\nya b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["Ax\n\n\nya b."]
undo: original
redo: edit
uncheck b: "# T\n\nAx\n\n\nya b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["Ax\n\n\nya b."]
change b: "# T\n\nAx\n\n\nya b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["Ax\n\n\nya b."]
## insert "x\n\n\ny" at 7
edit: "# T\n\nAax\n\n\ny b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["Aax\n\n\ny b."]
undo: original
redo: edit
uncheck b: "# T\n\nAax\n\n\ny b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["Aax\n\n\ny b."]
change b: "# T\n\nAax\n\n\ny b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["Aax\n\n\ny b."]
## insert "x\n\n\ny" at 8
edit: "# T\n\nAa x\n\n\nyb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["Aa x\n\n\nyb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa x\n\n\nyb.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["Aa x\n\n\nyb."]
change b: "# T\n\nAa x\n\n\nyb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["Aa x\n\n\nyb."]
## insert "x\n\n\ny" at 9
edit: "# T\n\nAa bx\n\n\ny.\n\nBb c.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["Aa bx\n\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bx\n\n\ny.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["Aa bx\n\n\ny."]
change b: "# T\n\nAa bx\n\n\ny.\n\nNew b.\n\nCc d." | title@0-3 a*@5-15 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["Aa bx\n\n\ny."]
## insert "x\n\n\ny" at 10
edit: "# T\n\nAa b.x\n\n\ny\n\nBb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@17-22 c@24-29 | sep 3-5 15-17 22-24 | authored ["Aa b.x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.x\n\n\ny\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." c@17-22 | sep 3-5 15-17 | authored ["Aa b.x\n\n\ny"]
change b: "# T\n\nAa b.x\n\n\ny\n\nNew b.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b@17-23 c@25-30 | sep 3-5 15-17 23-25 | authored ["Aa b.x\n\n\ny"]
## insert "x\n\n\ny" at 11
edit: "# T\n\nAa b.\nx\n\n\ny\nBb c.\n\nCc d." | title@0-3 a@5-10 b@17-22 c@24-29 | sep 3-5 10-11 16-17 22-24 | authored ["x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\n\n\ny\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-11 16-18 | authored ["x\n\n\ny"]
change b: "# T\n\nAa b.\nx\n\n\ny\nNew b.\n\nCc d." | title@0-3 a@5-10 b@17-23 c@25-30 | sep 3-5 10-11 16-17 23-25 | authored ["x\n\n\ny"]
## insert "x\n\n\ny" at 12
edit: "# T\n\nAa b.\n\nx\n\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 b*@16-22 o=17-22 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["x\n\n\nyBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nx\n\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["x\n\n\nyBb c."]
change b: "# T\n\nAa b.\n\nx\n\n\nyBb c.\n\nCc d." | title@0-3 a@5-10 b*@16-22 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["x\n\n\nyBb c."]
## insert "x\n\n\ny" at 13
edit: "# T\n\nAa b.\n\nBx\n\n\nyb c.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bx\n\n\nyb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBx\n\n\nyb c.\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["Bx\n\n\nyb c."]
change b: "# T\n\nAa b.\n\nBx\n\n\nyb c.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bx\n\n\nyb c."]
## insert "x\n\n\ny" at 14
edit: "# T\n\nAa b.\n\nBbx\n\n\ny c.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bbx\n\n\ny c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbx\n\n\ny c.\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["Bbx\n\n\ny c."]
change b: "# T\n\nAa b.\n\nBbx\n\n\ny c.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bbx\n\n\ny c."]
## insert "x\n\n\ny" at 15
edit: "# T\n\nAa b.\n\nBb x\n\n\nyc.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb x\n\n\nyc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb x\n\n\nyc.\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb x\n\n\nyc."]
change b: "# T\n\nAa b.\n\nBb x\n\n\nyc.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb x\n\n\nyc."]
## insert "x\n\n\ny" at 16
edit: "# T\n\nAa b.\n\nBb cx\n\n\ny.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb cx\n\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cx\n\n\ny.\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb cx\n\n\ny."]
change b: "# T\n\nAa b.\n\nBb cx\n\n\ny.\n\nCc d." | title@0-3 a@5-10 b*@12-22 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb cx\n\n\ny."]
## insert "x\n\n\ny" at 17
edit: "# T\n\nAa b.\n\nBb c.x\n\n\ny\n\nCc d." | title@0-3 a@5-10 b*@12-18 o=12-17 g="Bb c." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb c.x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c.x\n\n\ny\n\nCc d." | title@0-3 a@5-10 c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb c.x\n\n\ny"]
change b: "# T\n\nAa b.\n\nBb c.x\n\n\ny\n\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@24-29 | sep 3-5 10-12 22-24 | authored ["Bb c.x\n\n\ny"]
## insert "x\n\n\ny" at 18
edit: "# T\n\nAa b.\n\nBb c.\nx\n\n\ny\nCc d." | title@0-3 a@5-10 b@12-17 c@24-29 | sep 3-5 10-12 17-18 23-24 | authored ["x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\n\n\ny\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-11 16-17 | authored ["x\n\n\ny"]
change b: "# T\n\nAa b.\n\nNew b.\nx\n\n\ny\nCc d." | title@0-3 a@5-10 b@12-18 c@25-30 | sep 3-5 10-12 18-19 24-25 | authored ["x\n\n\ny"]
## insert "x\n\n\ny" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\nx\n\n\nyCc d." | title@0-3 a@5-10 b@12-17 c*@23-29 o=24-29 g="Cc d." | sep 3-5 10-12 17-19 | authored ["x\n\n\nyCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nx\n\n\nyCc d." | title@0-3 a@5-10 c*@16-22 o=17-22 g="Cc d." | sep 3-5 10-12 | authored ["x\n\n\nyCc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nx\n\n\nyCc d." | title@0-3 a@5-10 b@12-18 c*@24-30 o=25-30 g="Cc d." | sep 3-5 10-12 18-20 | authored ["x\n\n\nyCc d."]
## insert "x\n\n\ny" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nCx\n\n\nyc d." | title@0-3 a@5-10 b@12-17 c*@19-29 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cx\n\n\nyc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCx\n\n\nyc d." | title@0-3 a@5-10 c*@12-22 g="Cc d." | sep 3-5 10-12 | authored ["Cx\n\n\nyc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCx\n\n\nyc d." | title@0-3 a@5-10 b@12-18 c*@20-30 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cx\n\n\nyc d."]
## insert "x\n\n\ny" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCcx\n\n\ny d." | title@0-3 a@5-10 b@12-17 c*@19-29 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccx\n\n\ny d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcx\n\n\ny d." | title@0-3 a@5-10 c*@12-22 g="Cc d." | sep 3-5 10-12 | authored ["Ccx\n\n\ny d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcx\n\n\ny d." | title@0-3 a@5-10 b@12-18 c*@20-30 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccx\n\n\ny d."]
## insert "x\n\n\ny" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc x\n\n\nyd." | title@0-3 a@5-10 b@12-17 c*@19-29 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc x\n\n\nyd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc x\n\n\nyd." | title@0-3 a@5-10 c*@12-22 g="Cc d." | sep 3-5 10-12 | authored ["Cc x\n\n\nyd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc x\n\n\nyd." | title@0-3 a@5-10 b@12-18 c*@20-30 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc x\n\n\nyd."]
## insert "x\n\n\ny" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc dx\n\n\ny." | title@0-3 a@5-10 b@12-17 c*@19-29 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc dx\n\n\ny."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc dx\n\n\ny." | title@0-3 a@5-10 c*@12-22 g="Cc d." | sep 3-5 10-12 | authored ["Cc dx\n\n\ny."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc dx\n\n\ny." | title@0-3 a@5-10 b@12-18 c*@20-30 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc dx\n\n\ny."]
## insert "x\n\n\ny" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.x\n\n\ny" | title@0-3 a@5-10 b@12-17 c*@19-25 o=19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d.x\n\n\ny"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.x\n\n\ny" | title@0-3 a@5-10 c*@12-18 o=12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc d.x\n\n\ny"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.x\n\n\ny" | title@0-3 a@5-10 b@12-18 c*@20-26 o=20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d.x\n\n\ny"]
## insert "\n x" at 0
edit: "\n x# T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-6 o=3-6 g="# T" a@8-13 b@15-20 c@22-27 | sep 6-8 13-15 20-22 | authored ["\n x# T"]
undo: original
redo: edit
uncheck b: "\n x# T\n\nAa b.\n\nCc d." | title*@0-6 o=3-6 g="# T" a@8-13 c@15-20 | sep 6-8 13-15 | authored ["\n x# T"]
change b: "\n x# T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-6 o=3-6 g="# T" a@8-13 b@15-21 c@23-28 | sep 6-8 13-15 21-23 | authored ["\n x# T"]
## insert "\n x" at 1
edit: "#\n x T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-6 g="# T" a@8-13 b@15-20 c@22-27 | sep 6-8 13-15 20-22 | authored ["#\n x T"]
undo: original
redo: edit
uncheck b: "#\n x T\n\nAa b.\n\nCc d." | title*@0-6 g="# T" a@8-13 c@15-20 | sep 6-8 13-15 | authored ["#\n x T"]
change b: "#\n x T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-6 g="# T" a@8-13 b@15-21 c@23-28 | sep 6-8 13-15 21-23 | authored ["#\n x T"]
## insert "\n x" at 2
edit: "# \n xT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-6 g="# T" a@8-13 b@15-20 c@22-27 | sep 6-8 13-15 20-22 | authored ["# \n xT"]
undo: original
redo: edit
uncheck b: "# \n xT\n\nAa b.\n\nCc d." | title*@0-6 g="# T" a@8-13 c@15-20 | sep 6-8 13-15 | authored ["# \n xT"]
change b: "# \n xT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-6 g="# T" a@8-13 b@15-21 c@23-28 | sep 6-8 13-15 21-23 | authored ["# \n xT"]
## insert "\n x" at 3
edit: "# T\n x\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-6 o=0-3 g="# T" a@8-13 b@15-20 c@22-27 | sep 6-8 13-15 20-22 | authored ["# T\n x"]
undo: original
redo: edit
uncheck b: "# T\n x\n\nAa b.\n\nCc d." | title*@0-6 o=0-3 g="# T" a@8-13 c@15-20 | sep 6-8 13-15 | authored ["# T\n x"]
change b: "# T\n x\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-6 o=0-3 g="# T" a@8-13 b@15-21 c@23-28 | sep 6-8 13-15 21-23 | authored ["# T\n x"]
## insert "\n x" at 4
edit: "# T\n\n x\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@8-13 b@15-20 c@22-27 | sep 3-4 7-8 13-15 20-22 | authored ["\n x"]
undo: original
redo: edit
uncheck b: "# T\n\n x\nAa b.\n\nCc d." | title@0-3 a@8-13 c@15-20 | sep 3-4 7-8 13-15 | authored ["\n x"]
change b: "# T\n\n x\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@8-13 b@15-21 c@23-28 | sep 3-4 7-8 13-15 21-23 | authored ["\n x"]
## insert "\n x" at 5
edit: "# T\n\n\n xAa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 o=8-13 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["\n xAa b."]
undo: original
redo: edit
uncheck b: "# T\n\n\n xAa b.\n\nCc d." | title@0-3 a*@5-13 o=8-13 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["\n xAa b."]
change b: "# T\n\n\n xAa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 o=8-13 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["\n xAa b."]
## insert "\n x" at 6
edit: "# T\n\nA\n xa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["A\n xa b."]
undo: original
redo: edit
uncheck b: "# T\n\nA\n xa b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["A\n xa b."]
change b: "# T\n\nA\n xa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["A\n xa b."]
## insert "\n x" at 7
edit: "# T\n\nAa\n x b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["Aa\n x b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa\n x b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa\n x b."]
change b: "# T\n\nAa\n x b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["Aa\n x b."]
## insert "\n x" at 8
edit: "# T\n\nAa \n xb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["Aa \n xb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa \n xb.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa \n xb."]
change b: "# T\n\nAa \n xb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["Aa \n xb."]
## insert "\n x" at 9
edit: "# T\n\nAa b\n x.\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["Aa b\n x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n x.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa b\n x."]
change b: "# T\n\nAa b\n x.\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["Aa b\n x."]
## insert "\n x" at 10
edit: "# T\n\nAa b.\n x\n\nBb c.\n\nCc d." | title@0-3 a*@5-13 o=5-10 g="Aa b." b@15-20 c@22-27 | sep 3-5 13-15 20-22 | authored ["Aa b.\n x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n x\n\nCc d." | title@0-3 a*@5-13 o=5-10 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa b.\n x"]
change b: "# T\n\nAa b.\n x\n\nNew b.\n\nCc d." | title@0-3 a*@5-13 o=5-10 g="Aa b." b@15-21 c@23-28 | sep 3-5 13-15 21-23 | authored ["Aa b.\n x"]
## insert "\n x" at 11
edit: "# T\n\nAa b.\n\n x\nBb c.\n\nCc d." | title@0-3 a@5-10 b@15-20 c@22-27 | sep 3-5 10-11 14-15 20-22 | authored ["\n x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n x\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-11 14-16 | authored ["\n x"]
change b: "# T\n\nAa b.\n\n x\nNew b.\n\nCc d." | title@0-3 a@5-10 b@15-21 c@23-28 | sep 3-5 10-11 14-15 21-23 | authored ["\n x"]
## insert "\n x" at 12
edit: "# T\n\nAa b.\n\n\n xBb c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 o=15-20 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["\n xBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n xBb c.\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["\n xBb c."]
change b: "# T\n\nAa b.\n\n\n xBb c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["\n xBb c."]
## insert "\n x" at 13
edit: "# T\n\nAa b.\n\nB\n xb c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["B\n xb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB\n xb c.\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["B\n xb c."]
change b: "# T\n\nAa b.\n\nB\n xb c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["B\n xb c."]
## insert "\n x" at 14
edit: "# T\n\nAa b.\n\nBb\n x c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb\n x c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb\n x c.\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb\n x c."]
change b: "# T\n\nAa b.\n\nBb\n x c.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb\n x c."]
## insert "\n x" at 15
edit: "# T\n\nAa b.\n\nBb \n xc.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb \n xc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb \n xc.\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb \n xc."]
change b: "# T\n\nAa b.\n\nBb \n xc.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb \n xc."]
## insert "\n x" at 16
edit: "# T\n\nAa b.\n\nBb c\n x.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c\n x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c\n x.\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c\n x."]
change b: "# T\n\nAa b.\n\nBb c\n x.\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c\n x."]
## insert "\n x" at 17
edit: "# T\n\nAa b.\n\nBb c.\n x\n\nCc d." | title@0-3 a@5-10 b*@12-20 o=12-17 g="Bb c." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c.\n x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c.\n x\n\nCc d." | title@0-3 a@5-10 c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c.\n x"]
change b: "# T\n\nAa b.\n\nBb c.\n x\n\nCc d." | title@0-3 a@5-10 b*@12-20 g="New b." c@22-27 | sep 3-5 10-12 20-22 | authored ["Bb c.\n x"]
## insert "\n x" at 18
edit: "# T\n\nAa b.\n\nBb c.\n\n x\nCc d." | title@0-3 a@5-10 b@12-17 c@22-27 | sep 3-5 10-12 17-18 21-22 | authored ["\n x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n x\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-11 14-15 | authored ["\n x"]
change b: "# T\n\nAa b.\n\nNew b.\n\n x\nCc d." | title@0-3 a@5-10 b@12-18 c@23-28 | sep 3-5 10-12 18-19 22-23 | authored ["\n x"]
## insert "\n x" at 19
edit: "# T\n\nAa b.\n\nBb c.\n\n\n xCc d." | title@0-3 a@5-10 b@12-17 c*@19-27 o=22-27 g="Cc d." | sep 3-5 10-12 17-19 | authored ["\n xCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n xCc d." | title@0-3 a@5-10 c*@12-20 o=15-20 g="Cc d." | sep 3-5 10-12 | authored ["\n xCc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\n\n xCc d." | title@0-3 a@5-10 b@12-18 c*@20-28 o=23-28 g="Cc d." | sep 3-5 10-12 18-20 | authored ["\n xCc d."]
## insert "\n x" at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nC\n xc d." | title@0-3 a@5-10 b@12-17 c*@19-27 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C\n xc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC\n xc d." | title@0-3 a@5-10 c*@12-20 g="Cc d." | sep 3-5 10-12 | authored ["C\n xc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC\n xc d." | title@0-3 a@5-10 b@12-18 c*@20-28 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C\n xc d."]
## insert "\n x" at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCc\n x d." | title@0-3 a@5-10 b@12-17 c*@19-27 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc\n x d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc\n x d." | title@0-3 a@5-10 c*@12-20 g="Cc d." | sep 3-5 10-12 | authored ["Cc\n x d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc\n x d." | title@0-3 a@5-10 b@12-18 c*@20-28 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc\n x d."]
## insert "\n x" at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCc \n xd." | title@0-3 a@5-10 b@12-17 c*@19-27 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc \n xd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc \n xd." | title@0-3 a@5-10 c*@12-20 g="Cc d." | sep 3-5 10-12 | authored ["Cc \n xd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc \n xd." | title@0-3 a@5-10 b@12-18 c*@20-28 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc \n xd."]
## insert "\n x" at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d\n x." | title@0-3 a@5-10 b@12-17 c*@19-27 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d\n x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d\n x." | title@0-3 a@5-10 c*@12-20 g="Cc d." | sep 3-5 10-12 | authored ["Cc d\n x."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d\n x." | title@0-3 a@5-10 b@12-18 c*@20-28 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d\n x."]
## insert "\n x" at 24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d.\n x" | title@0-3 a@5-10 b@12-17 c*@19-27 o=19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d.\n x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d.\n x" | title@0-3 a@5-10 c*@12-20 o=12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc d.\n x"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d.\n x" | title@0-3 a@5-10 b@12-18 c*@20-28 o=20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d.\n x"]
## delete 0-1 and insert at 1
edit: "x T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["x T"]
undo: original
redo: edit
uncheck b: "x T\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["x T"]
change b: "x T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["x T"]
## delete 1-2 and insert at 2
edit: "#xT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["#xT"]
undo: original
redo: edit
uncheck b: "#xT\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["#xT"]
change b: "#xT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["#xT"]
## delete 2-3 and insert at 3
edit: "# x\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["# x"]
undo: original
redo: edit
uncheck b: "# x\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["# x"]
change b: "# x\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["# x"]
## delete 3-4 and insert at 4
edit: "# Tx\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 4-5 10-12 17-19 | authored ["x"]
undo: original
redo: edit
uncheck b: "# Tx\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 4-5 10-12 | authored ["x"]
change b: "# Tx\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 4-5 10-12 18-20 | authored ["x"]
## delete 4-5 and insert at 5
edit: "# T\nxAa b.\n\nBb c.\n\nCc d." | title@0-3 a*@4-10 o=5-10 g="Aa b." b@12-17 c@19-24 | sep 3-4 10-12 17-19 | authored ["xAa b."]
undo: original
redo: edit
uncheck b: "# T\nxAa b.\n\nCc d." | title@0-3 a*@4-10 o=5-10 g="Aa b." c@12-17 | sep 3-4 10-12 | authored ["xAa b."]
change b: "# T\nxAa b.\n\nNew b.\n\nCc d." | title@0-3 a*@4-10 o=5-10 g="Aa b." b@12-18 c@20-25 | sep 3-4 10-12 18-20 | authored ["xAa b."]
## delete 5-6 and insert at 6
edit: "# T\n\nxa b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["xa b."]
undo: original
redo: edit
uncheck b: "# T\n\nxa b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["xa b."]
change b: "# T\n\nxa b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["xa b."]
## delete 6-7 and insert at 7
edit: "# T\n\nAx b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Ax b."]
undo: original
redo: edit
uncheck b: "# T\n\nAx b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Ax b."]
change b: "# T\n\nAx b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Ax b."]
## delete 7-8 and insert at 8
edit: "# T\n\nAaxb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aaxb."]
undo: original
redo: edit
uncheck b: "# T\n\nAaxb.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aaxb."]
change b: "# T\n\nAaxb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aaxb."]
## delete 8-9 and insert at 9
edit: "# T\n\nAa x.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aa x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa x.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa x."]
change b: "# T\n\nAa x.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aa x."]
## delete 9-10 and insert at 10
edit: "# T\n\nAa bx\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aa bx"]
undo: original
redo: edit
uncheck b: "# T\n\nAa bx\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa bx"]
change b: "# T\n\nAa bx\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aa bx"]
## delete 10-11 and insert at 11
edit: "# T\n\nAa b.x\nBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 11-12 17-19 | authored ["x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.x\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["x"]
change b: "# T\n\nAa b.x\nNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 11-12 18-20 | authored ["x"]
## delete 11-12 and insert at 12
edit: "# T\n\nAa b.\nxBb c.\n\nCc d." | title@0-3 a@5-10 b*@11-17 o=12-17 g="Bb c." c@19-24 | sep 3-5 10-11 17-19 | authored ["xBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nxBb c.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-11 17-19 | authored ["xBb c."]
change b: "# T\n\nAa b.\nxBb c.\n\nCc d." | title@0-3 a@5-10 b*@11-17 g="New b." c@19-24 | sep 3-5 10-11 17-19 | authored ["xBb c."]
## delete 12-13 and insert at 13
edit: "# T\n\nAa b.\n\nxb c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["xb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxb c.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["xb c."]
change b: "# T\n\nAa b.\n\nxb c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["xb c."]
## delete 13-14 and insert at 14
edit: "# T\n\nAa b.\n\nBx c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bx c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBx c.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bx c."]
change b: "# T\n\nAa b.\n\nBx c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bx c."]
## delete 14-15 and insert at 15
edit: "# T\n\nAa b.\n\nBbxc.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbxc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbxc.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbxc."]
change b: "# T\n\nAa b.\n\nBbxc.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbxc."]
## delete 15-16 and insert at 16
edit: "# T\n\nAa b.\n\nBb x.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb x.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb x."]
change b: "# T\n\nAa b.\n\nBb x.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb x."]
## delete 16-17 and insert at 17
edit: "# T\n\nAa b.\n\nBb cx\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cx"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cx\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cx"]
change b: "# T\n\nAa b.\n\nBb cx\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cx"]
## delete 17-18 and insert at 18
edit: "# T\n\nAa b.\n\nBb c.x\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 18-19 | authored ["x"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nx\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 13-14 | authored ["x"]
change b: "# T\n\nAa b.\n\nNew b.x\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 19-20 | authored ["x"]
## delete 18-19 and insert at 19
edit: "# T\n\nAa b.\n\nBb c.\nxCc d." | title@0-3 a@5-10 b@12-17 c*@18-24 o=19-24 g="Cc d." | sep 3-5 10-12 17-18 | authored ["xCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nxCc d." | title@0-3 a@5-10 c*@11-17 o=12-17 g="Cc d." | sep 3-5 10-11 | authored ["xCc d."]
change b: "# T\n\nAa b.\n\nNew b.\nxCc d." | title@0-3 a@5-10 b@12-18 c*@19-25 o=20-25 g="Cc d." | sep 3-5 10-12 18-19 | authored ["xCc d."]
## delete 19-20 and insert at 20
edit: "# T\n\nAa b.\n\nBb c.\n\nxc d." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["xc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxc d." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["xc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nxc d." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["xc d."]
## delete 20-21 and insert at 21
edit: "# T\n\nAa b.\n\nBb c.\n\nCx d." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cx d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCx d." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cx d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCx d." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cx d."]
## delete 21-22 and insert at 22
edit: "# T\n\nAa b.\n\nBb c.\n\nCcxd." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccxd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcxd." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Ccxd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcxd." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccxd."]
## delete 22-23 and insert at 23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc x." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc x."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc x." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc x."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc x." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc x."]
## delete 0-1
edit: " T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 2-4 9-11 16-18 | authored [" T"]
undo: original
redo: edit
uncheck b: " T\n\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 2-4 9-11 | authored [" T"]
change b: " T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 2-4 9-11 17-19 | authored [" T"]
## replace 0-1
edit: "z T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["z T"]
undo: original
redo: edit
uncheck b: "z T\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["z T"]
change b: "z T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["z T"]
## delete 1-2
edit: "#T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 2-4 9-11 16-18 | authored ["#T"]
undo: original
redo: edit
uncheck b: "#T\n\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 2-4 9-11 | authored ["#T"]
change b: "#T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 2-4 9-11 17-19 | authored ["#T"]
## replace 1-2
edit: "#zT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["#zT"]
undo: original
redo: edit
uncheck b: "#zT\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["#zT"]
change b: "#zT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["#zT"]
## delete 2-3
edit: "# \n\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 2-4 9-11 16-18 | authored ["# "]
undo: original
redo: edit
uncheck b: "# \n\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 2-4 9-11 | authored ["# "]
change b: "# \n\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 2-4 9-11 17-19 | authored ["# "]
## replace 2-3
edit: "# z\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["# z"]
undo: original
redo: edit
uncheck b: "# z\n\nAa b.\n\nCc d." | title*@0-3 g="# T" a@5-10 c@12-17 | sep 3-5 10-12 | authored ["# z"]
change b: "# z\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-3 g="# T" a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["# z"]
## delete 3-4
edit: "# T\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@4-9 b@11-16 c@18-23 | sep 3-4 9-11 16-18 | authored []
undo: original
redo: edit
uncheck b: "# T\nAa b.\n\nCc d." | title@0-3 a@4-9 c@11-16 | sep 3-4 9-11 | authored []
change b: "# T\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@4-9 b@11-17 c@19-24 | sep 3-4 9-11 17-19 | authored []
## replace 3-4
edit: "# Tz\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 4-5 10-12 17-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# Tz\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 4-5 10-12 | authored ["z"]
change b: "# Tz\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 4-5 10-12 18-20 | authored ["z"]
## delete 4-5
edit: "# T\nAa b.\n\nBb c.\n\nCc d." | title@0-3 a@4-9 b@11-16 c@18-23 | sep 3-4 9-11 16-18 | authored []
undo: original
redo: edit
uncheck b: "# T\nAa b.\n\nCc d." | title@0-3 a@4-9 c@11-16 | sep 3-4 9-11 | authored []
change b: "# T\nAa b.\n\nNew b.\n\nCc d." | title@0-3 a@4-9 b@11-17 c@19-24 | sep 3-4 9-11 17-19 | authored []
## replace 4-5
edit: "# T\nzAa b.\n\nBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-4 10-12 17-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\nzAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-4 10-12 | authored ["z"]
change b: "# T\nzAa b.\n\nNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-4 10-12 18-20 | authored ["z"]
## delete 5-6
edit: "# T\n\na b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["a b."]
undo: original
redo: edit
uncheck b: "# T\n\na b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["a b."]
change b: "# T\n\na b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["a b."]
## replace 5-6
edit: "# T\n\nza b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["za b."]
undo: original
redo: edit
uncheck b: "# T\n\nza b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["za b."]
change b: "# T\n\nza b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["za b."]
## delete 6-7
edit: "# T\n\nA b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["A b."]
undo: original
redo: edit
uncheck b: "# T\n\nA b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["A b."]
change b: "# T\n\nA b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["A b."]
## replace 6-7
edit: "# T\n\nAz b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Az b."]
undo: original
redo: edit
uncheck b: "# T\n\nAz b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Az b."]
change b: "# T\n\nAz b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Az b."]
## delete 7-8
edit: "# T\n\nAab.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Aab."]
undo: original
redo: edit
uncheck b: "# T\n\nAab.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aab."]
change b: "# T\n\nAab.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Aab."]
## replace 7-8
edit: "# T\n\nAazb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aazb."]
undo: original
redo: edit
uncheck b: "# T\n\nAazb.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aazb."]
change b: "# T\n\nAazb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aazb."]
## delete 8-9
edit: "# T\n\nAa .\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Aa ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa .\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa ."]
change b: "# T\n\nAa .\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Aa ."]
## replace 8-9
edit: "# T\n\nAa z.\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aa z."]
undo: original
redo: edit
uncheck b: "# T\n\nAa z.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa z."]
change b: "# T\n\nAa z.\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aa z."]
## delete 9-10
edit: "# T\n\nAa b\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Aa b"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa b"]
change b: "# T\n\nAa b\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Aa b"]
## replace 9-10
edit: "# T\n\nAa bz\n\nBb c.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-17 c@19-24 | sep 3-5 10-12 17-19 | authored ["Aa bz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa bz\n\nCc d." | title@0-3 a*@5-10 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa bz"]
change b: "# T\n\nAa bz\n\nNew b.\n\nCc d." | title@0-3 a*@5-10 g="Aa b." b@12-18 c@20-25 | sep 3-5 10-12 18-20 | authored ["Aa bz"]
## delete 10-11
edit: "# T\n\nAa b.\nBb c.\n\nCc d." | title@0-3 a@5-10 b@11-16 c@18-23 | sep 3-5 10-11 16-18 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\nNew b.\n\nCc d." | title@0-3 a@5-10 b@11-17 c@19-24 | sep 3-5 10-11 17-19 | authored []
## replace 10-11
edit: "# T\n\nAa b.z\nBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 11-12 17-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.z\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["z"]
change b: "# T\n\nAa b.z\nNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 11-12 18-20 | authored ["z"]
## delete 11-12
edit: "# T\n\nAa b.\nBb c.\n\nCc d." | title@0-3 a@5-10 b@11-16 c@18-23 | sep 3-5 10-11 16-18 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\nNew b.\n\nCc d." | title@0-3 a@5-10 b@11-17 c@19-24 | sep 3-5 10-11 17-19 | authored []
## replace 11-12
edit: "# T\n\nAa b.\nzBb c.\n\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-11 17-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 12-14 | authored ["z"]
change b: "# T\n\nAa b.\nzNew b.\n\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-11 18-20 | authored ["z"]
## delete 12-13
edit: "# T\n\nAa b.\n\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nb c.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["b c."]
change b: "# T\n\nAa b.\n\nb c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["b c."]
## replace 12-13
edit: "# T\n\nAa b.\n\nzb c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["zb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzb c.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["zb c."]
change b: "# T\n\nAa b.\n\nzb c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["zb c."]
## delete 13-14
edit: "# T\n\nAa b.\n\nB c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["B c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB c.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["B c."]
change b: "# T\n\nAa b.\n\nB c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["B c."]
## replace 13-14
edit: "# T\n\nAa b.\n\nBz c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bz c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBz c.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bz c."]
change b: "# T\n\nAa b.\n\nBz c.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bz c."]
## delete 14-15
edit: "# T\n\nAa b.\n\nBbc.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbc.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbc."]
change b: "# T\n\nAa b.\n\nBbc.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbc."]
## replace 14-15
edit: "# T\n\nAa b.\n\nBbzc.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbzc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbzc.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbzc."]
change b: "# T\n\nAa b.\n\nBbzc.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bbzc."]
## delete 15-16
edit: "# T\n\nAa b.\n\nBb .\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb .\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb ."]
change b: "# T\n\nAa b.\n\nBb .\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb ."]
## replace 15-16
edit: "# T\n\nAa b.\n\nBb z.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb z."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb z.\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb z."]
change b: "# T\n\nAa b.\n\nBb z.\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb z."]
## delete 16-17
edit: "# T\n\nAa b.\n\nBb c\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb c"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb c"]
change b: "# T\n\nAa b.\n\nBb c\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb c"]
## replace 16-17
edit: "# T\n\nAa b.\n\nBb cz\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="Bb c." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cz\n\nCc d." | title@0-3 a@5-10 c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cz"]
change b: "# T\n\nAa b.\n\nBb cz\n\nCc d." | title@0-3 a@5-10 b*@12-17 g="New b." c@19-24 | sep 3-5 10-12 17-19 | authored ["Bb cz"]
## delete 17-18
edit: "# T\n\nAa b.\n\nBb c.\nCc d." | title@0-3 a@5-10 b@12-17 c@18-23 | sep 3-5 10-12 17-18 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nCc d." | title@0-3 a@5-10 c@11-16 | sep 3-5 10-11 | authored []
change b: "# T\n\nAa b.\n\nNew b.\nCc d." | title@0-3 a@5-10 b@12-18 c@19-24 | sep 3-5 10-12 18-19 | authored []
## replace 17-18
edit: "# T\n\nAa b.\n\nBb c.z\nCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 18-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 13-14 | authored ["z"]
change b: "# T\n\nAa b.\n\nNew b.z\nCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 19-20 | authored ["z"]
## delete 18-19
edit: "# T\n\nAa b.\n\nBb c.\nCc d." | title@0-3 a@5-10 b@12-17 c@18-23 | sep 3-5 10-12 17-18 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nCc d." | title@0-3 a@5-10 c@11-16 | sep 3-5 10-11 | authored []
change b: "# T\n\nAa b.\n\nNew b.\nCc d." | title@0-3 a@5-10 b@12-18 c@19-24 | sep 3-5 10-12 18-19 | authored []
## replace 18-19
edit: "# T\n\nAa b.\n\nBb c.\nzCc d." | title@0-3 a@5-10 b@12-17 c@19-24 | sep 3-5 10-12 17-18 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nzCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-11 | authored ["z"]
change b: "# T\n\nAa b.\n\nNew b.\nzCc d." | title@0-3 a@5-10 b@12-18 c@20-25 | sep 3-5 10-12 18-19 | authored ["z"]
## delete 19-20
edit: "# T\n\nAa b.\n\nBb c.\n\nc d." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nc d." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["c d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nc d." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["c d."]
## replace 19-20
edit: "# T\n\nAa b.\n\nBb c.\n\nzc d." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["zc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzc d." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["zc d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nzc d." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["zc d."]
## delete 20-21
edit: "# T\n\nAa b.\n\nBb c.\n\nC d." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC d." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["C d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC d." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C d."]
## replace 20-21
edit: "# T\n\nAa b.\n\nBb c.\n\nCz d." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cz d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCz d." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cz d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCz d." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cz d."]
## delete 21-22
edit: "# T\n\nAa b.\n\nBb c.\n\nCcd." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcd." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Ccd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcd." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccd."]
## replace 21-22
edit: "# T\n\nAa b.\n\nBb c.\n\nCczd." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cczd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCczd." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cczd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCczd." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cczd."]
## delete 22-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc ." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc ."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc ." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Cc ."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc ." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc ."]
## replace 22-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc z." | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc z."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc z." | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc z."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc z." | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc z."]
## delete 23-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc d" | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc d"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d" | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Cc d"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc d" | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc d"]
## replace 23-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc dz" | title@0-3 a@5-10 b@12-17 c*@19-24 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc dz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc dz" | title@0-3 a@5-10 c*@12-17 g="Cc d." | sep 3-5 10-12 | authored ["Cc dz"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc dz" | title@0-3 a@5-10 b@12-18 c*@20-25 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc dz"]
## delete 0-2
edit: "T\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-15 c@17-22 | sep 1-3 8-10 15-17 | authored ["T"]
undo: original
redo: edit
uncheck b: "T\n\nAa b.\n\nCc d." | title*@0-1 g="# T" a@3-8 c@10-15 | sep 1-3 8-10 | authored ["T"]
change b: "T\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-16 c@18-23 | sep 1-3 8-10 16-18 | authored ["T"]
## replace 0-2
edit: "zT\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 2-4 9-11 16-18 | authored ["zT"]
undo: original
redo: edit
uncheck b: "zT\n\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 2-4 9-11 | authored ["zT"]
change b: "zT\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 2-4 9-11 17-19 | authored ["zT"]
## delete 1-3
edit: "#\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-15 c@17-22 | sep 1-3 8-10 15-17 | authored ["#"]
undo: original
redo: edit
uncheck b: "#\n\nAa b.\n\nCc d." | title*@0-1 g="# T" a@3-8 c@10-15 | sep 1-3 8-10 | authored ["#"]
change b: "#\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-16 c@18-23 | sep 1-3 8-10 16-18 | authored ["#"]
## replace 1-3
edit: "#z\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 2-4 9-11 16-18 | authored ["#z"]
undo: original
redo: edit
uncheck b: "#z\n\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 2-4 9-11 | authored ["#z"]
change b: "#z\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 2-4 9-11 17-19 | authored ["#z"]
## delete 2-4
edit: "# \nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@3-8 b@10-15 c@17-22 | sep 2-3 8-10 15-17 | authored ["# "]
undo: original
redo: edit
uncheck b: "# \nAa b.\n\nCc d." | title*@0-2 g="# T" a@3-8 c@10-15 | sep 2-3 8-10 | authored ["# "]
change b: "# \nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@3-8 b@10-16 c@18-23 | sep 2-3 8-10 16-18 | authored ["# "]
## replace 2-4
edit: "# z\nAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-16 c@18-23 | sep 3-4 9-11 16-18 | authored ["# z"]
undo: original
redo: edit
uncheck b: "# z\nAa b.\n\nCc d." | title*@0-2 g="# T" a@4-9 c@11-16 | sep 3-4 9-11 | authored ["# z"]
change b: "# z\nAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@4-9 b@11-17 c@19-24 | sep 3-4 9-11 17-19 | authored ["# z"]
## delete 3-5
edit: "# TAa b.\n\nBb c.\n\nCc d." | title@0-3 a@3-8 b@10-15 c@17-22 | sep 8-10 15-17 | authored []
undo: original
redo: edit
uncheck b: "# TAa b.\n\nCc d." | title@0-3 a@3-8 c@10-15 | sep 8-10 | authored []
change b: "# TAa b.\n\nNew b.\n\nCc d." | title@0-3 a@3-8 b@10-16 c@18-23 | sep 8-10 16-18 | authored []
## replace 3-5
edit: "# TzAa b.\n\nBb c.\n\nCc d." | title@0-3 a@4-9 b@11-16 c@18-23 | sep 9-11 16-18 | authored ["z"]
undo: original
redo: edit
uncheck b: "# TzAa b.\n\nCc d." | title@0-3 a@4-9 c@11-16 | sep 9-11 | authored ["z"]
change b: "# TzAa b.\n\nNew b.\n\nCc d." | title@0-3 a@4-9 b@11-17 c@19-24 | sep 9-11 17-19 | authored ["z"]
## delete 4-6
edit: "# T\na b.\n\nBb c.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." b@10-15 c@17-22 | sep 3-4 8-10 15-17 | authored ["a b."]
undo: original
redo: edit
uncheck b: "# T\na b.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." c@10-15 | sep 3-4 8-10 | authored ["a b."]
change b: "# T\na b.\n\nNew b.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." b@10-16 c@18-23 | sep 3-4 8-10 16-18 | authored ["a b."]
## replace 4-6
edit: "# T\nza b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-4 9-11 16-18 | authored ["za b."]
undo: original
redo: edit
uncheck b: "# T\nza b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-4 9-11 | authored ["za b."]
change b: "# T\nza b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-4 9-11 17-19 | authored ["za b."]
## delete 5-7
edit: "# T\n\n b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored [" b."]
undo: original
redo: edit
uncheck b: "# T\n\n b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored [" b."]
change b: "# T\n\n b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored [" b."]
## replace 5-7
edit: "# T\n\nz b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["z b."]
undo: original
redo: edit
uncheck b: "# T\n\nz b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["z b."]
change b: "# T\n\nz b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["z b."]
## delete 6-8
edit: "# T\n\nAb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["Ab."]
undo: original
redo: edit
uncheck b: "# T\n\nAb.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Ab."]
change b: "# T\n\nAb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["Ab."]
## replace 6-8
edit: "# T\n\nAzb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Azb."]
undo: original
redo: edit
uncheck b: "# T\n\nAzb.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Azb."]
change b: "# T\n\nAzb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Azb."]
## delete 7-9
edit: "# T\n\nAa.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["Aa."]
undo: original
redo: edit
uncheck b: "# T\n\nAa.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Aa."]
change b: "# T\n\nAa.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["Aa."]
## replace 7-9
edit: "# T\n\nAaz.\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Aaz."]
undo: original
redo: edit
uncheck b: "# T\n\nAaz.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aaz."]
change b: "# T\n\nAaz.\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Aaz."]
## delete 8-10
edit: "# T\n\nAa \n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["Aa "]
undo: original
redo: edit
uncheck b: "# T\n\nAa \n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Aa "]
change b: "# T\n\nAa \n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["Aa "]
## replace 8-10
edit: "# T\n\nAa z\n\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 9-11 16-18 | authored ["Aa z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa z\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa z"]
change b: "# T\n\nAa z\n\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 9-11 17-19 | authored ["Aa z"]
## delete 9-11
edit: "# T\n\nAa b\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@10-15 c@17-22 | sep 3-5 9-10 15-17 | authored ["Aa b"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa b"]
change b: "# T\n\nAa b\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@10-16 c@18-23 | sep 3-5 9-10 16-18 | authored ["Aa b"]
## replace 9-11
edit: "# T\n\nAa bz\nBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-16 c@18-23 | sep 3-5 10-11 16-18 | authored ["Aa bz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa bz\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa bz"]
change b: "# T\n\nAa bz\nNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@11-17 c@19-24 | sep 3-5 10-11 17-19 | authored ["Aa bz"]
## delete 10-12
edit: "# T\n\nAa b.Bb c.\n\nCc d." | title@0-3 a@5-10 b@10-15 c@17-22 | sep 3-5 15-17 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.New b.\n\nCc d." | title@0-3 a@5-10 b@10-16 c@18-23 | sep 3-5 16-18 | authored []
## replace 10-12
edit: "# T\n\nAa b.zBb c.\n\nCc d." | title@0-3 a@5-10 b@11-16 c@18-23 | sep 3-5 16-18 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.z\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["z"]
change b: "# T\n\nAa b.zNew b.\n\nCc d." | title@0-3 a@5-10 b@11-17 c@19-24 | sep 3-5 17-19 | authored ["z"]
## delete 11-13
edit: "# T\n\nAa b.\nb c.\n\nCc d." | title@0-3 a@5-10 b*@11-15 g="Bb c." c@17-22 | sep 3-5 10-11 15-17 | authored ["b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nb c.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-11 15-17 | authored ["b c."]
change b: "# T\n\nAa b.\nb c.\n\nCc d." | title@0-3 a@5-10 b*@11-15 g="New b." c@17-22 | sep 3-5 10-11 15-17 | authored ["b c."]
## replace 11-13
edit: "# T\n\nAa b.\nzb c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-11 16-18 | authored ["zb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nzb c.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-11 16-18 | authored ["zb c."]
change b: "# T\n\nAa b.\nzb c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-11 16-18 | authored ["zb c."]
## delete 12-14
edit: "# T\n\nAa b.\n\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored [" c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n c.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored [" c."]
change b: "# T\n\nAa b.\n\n c.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored [" c."]
## replace 12-14
edit: "# T\n\nAa b.\n\nz c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["z c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz c.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["z c."]
change b: "# T\n\nAa b.\n\nz c.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["z c."]
## delete 13-15
edit: "# T\n\nAa b.\n\nBc.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBc.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["Bc."]
change b: "# T\n\nAa b.\n\nBc.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bc."]
## replace 13-15
edit: "# T\n\nAa b.\n\nBzc.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bzc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBzc.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bzc."]
change b: "# T\n\nAa b.\n\nBzc.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bzc."]
## delete 14-16
edit: "# T\n\nAa b.\n\nBb.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb."]
change b: "# T\n\nAa b.\n\nBb.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb."]
## replace 14-16
edit: "# T\n\nAa b.\n\nBbz.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbz.\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbz."]
change b: "# T\n\nAa b.\n\nBbz.\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bbz."]
## delete 15-17
edit: "# T\n\nAa b.\n\nBb \n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb \n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb "]
change b: "# T\n\nAa b.\n\nBb \n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bb "]
## replace 15-17
edit: "# T\n\nAa b.\n\nBb z\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb z\n\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb z"]
change b: "# T\n\nAa b.\n\nBb z\n\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 16-18 | authored ["Bb z"]
## delete 16-18
edit: "# T\n\nAa b.\n\nBb c\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb c"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb c"]
change b: "# T\n\nAa b.\n\nBb c\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb c"]
## replace 16-18
edit: "# T\n\nAa b.\n\nBb cz\nCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@18-23 | sep 3-5 10-12 17-18 | authored ["Bb cz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cz\nCc d." | title@0-3 a@5-10 c@18-23 | sep 3-5 10-12 17-18 | authored ["Bb cz"]
change b: "# T\n\nAa b.\n\nBb cz\nCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@18-23 | sep 3-5 10-12 17-18 | authored ["Bb cz"]
## delete 17-19
edit: "# T\n\nAa b.\n\nBb c.Cc d." | title@0-3 a@5-10 b@12-17 c@17-22 | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\n\nNew b.Cc d." | title@0-3 a@5-10 b@12-18 c@18-23 | sep 3-5 10-12 | authored []
## replace 17-19
edit: "# T\n\nAa b.\n\nBb c.zCc d." | title@0-3 a@5-10 b@12-17 c@18-23 | sep 3-5 10-12 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-12 | authored ["z"]
change b: "# T\n\nAa b.\n\nNew b.zCc d." | title@0-3 a@5-10 b@12-18 c@19-24 | sep 3-5 10-12 | authored ["z"]
## delete 18-20
edit: "# T\n\nAa b.\n\nBb c.\nc d." | title@0-3 a@5-10 b@12-17 c*@18-22 g="Cc d." | sep 3-5 10-12 17-18 | authored ["c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nc d." | title@0-3 a@5-10 c*@11-15 g="Cc d." | sep 3-5 10-11 | authored ["c d."]
change b: "# T\n\nAa b.\n\nNew b.\nc d." | title@0-3 a@5-10 b@12-18 c*@19-23 g="Cc d." | sep 3-5 10-12 18-19 | authored ["c d."]
## replace 18-20
edit: "# T\n\nAa b.\n\nBb c.\nzc d." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-18 | authored ["zc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nzc d." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-11 | authored ["zc d."]
change b: "# T\n\nAa b.\n\nNew b.\nzc d." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-19 | authored ["zc d."]
## delete 19-21
edit: "# T\n\nAa b.\n\nBb c.\n\n d." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored [" d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n d." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored [" d."]
change b: "# T\n\nAa b.\n\nNew b.\n\n d." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored [" d."]
## replace 19-21
edit: "# T\n\nAa b.\n\nBb c.\n\nz d." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["z d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz d." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["z d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nz d." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["z d."]
## delete 20-22
edit: "# T\n\nAa b.\n\nBb c.\n\nCd." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCd." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["Cd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCd." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cd."]
## replace 20-22
edit: "# T\n\nAa b.\n\nBb c.\n\nCzd." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Czd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCzd." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Czd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCzd." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Czd."]
## delete 21-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCc." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["Cc."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc."]
## replace 21-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCcz." | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcz." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Ccz."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcz." | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccz."]
## delete 22-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc " | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc " | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["Cc "]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc " | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc "]
## replace 22-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc z" | title@0-3 a@5-10 b@12-17 c*@19-23 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc z" | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["Cc z"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc z" | title@0-3 a@5-10 b@12-18 c*@20-24 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc z"]
## delete 0-3
edit: "\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-0 g="# T" a@2-7 b@9-14 c@16-21 | sep 0-2 7-9 14-16 | authored []
undo: original
redo: edit
uncheck b: "\n\nAa b.\n\nCc d." | title*@0-0 g="# T" a@2-7 c@9-14 | sep 0-2 7-9 | authored []
change b: "\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-0 g="# T" a@2-7 b@9-15 c@17-22 | sep 0-2 7-9 15-17 | authored []
## replace 0-3
edit: "z\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-15 c@17-22 | sep 1-3 8-10 15-17 | authored ["z"]
undo: original
redo: edit
uncheck b: "z\n\nAa b.\n\nCc d." | title*@0-1 g="# T" a@3-8 c@10-15 | sep 1-3 8-10 | authored ["z"]
change b: "z\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-16 c@18-23 | sep 1-3 8-10 16-18 | authored ["z"]
## delete 1-4
edit: "#\nAa b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a@2-7 b@9-14 c@16-21 | sep 1-2 7-9 14-16 | authored ["#"]
undo: original
redo: edit
uncheck b: "#\nAa b.\n\nCc d." | title*@0-1 g="# T" a@2-7 c@9-14 | sep 1-2 7-9 | authored ["#"]
change b: "#\nAa b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a@2-7 b@9-15 c@17-22 | sep 1-2 7-9 15-17 | authored ["#"]
## replace 1-4
edit: "#z\nAa b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-15 c@17-22 | sep 2-3 8-10 15-17 | authored ["#z"]
undo: original
redo: edit
uncheck b: "#z\nAa b.\n\nCc d." | title*@0-1 g="# T" a@3-8 c@10-15 | sep 2-3 8-10 | authored ["#z"]
change b: "#z\nAa b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a@3-8 b@10-16 c@18-23 | sep 2-3 8-10 16-18 | authored ["#z"]
## delete 2-5
edit: "# Aa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@2-7 b@9-14 c@16-21 | sep 7-9 14-16 | authored ["# "]
undo: original
redo: edit
uncheck b: "# Aa b.\n\nCc d." | title*@0-2 g="# T" a@2-7 c@9-14 | sep 7-9 | authored ["# "]
change b: "# Aa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@2-7 b@9-15 c@17-22 | sep 7-9 15-17 | authored ["# "]
## replace 2-5
edit: "# zAa b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a@3-8 b@10-15 c@17-22 | sep 8-10 15-17 | authored ["# z"]
undo: original
redo: edit
uncheck b: "# zAa b.\n\nCc d." | title*@0-2 g="# T" a@3-8 c@10-15 | sep 8-10 | authored ["# z"]
change b: "# zAa b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a@3-8 b@10-16 c@18-23 | sep 8-10 16-18 | authored ["# z"]
## delete 3-6
edit: "# Ta b.\n\nBb c.\n\nCc d." | title@0-3 a*@3-7 g="Aa b." b@9-14 c@16-21 | sep 7-9 14-16 | authored ["a b."]
undo: original
redo: edit
uncheck b: "# Ta b.\n\nCc d." | title@0-3 a*@3-7 g="Aa b." c@9-14 | sep 7-9 | authored ["a b."]
change b: "# Ta b.\n\nNew b.\n\nCc d." | title@0-3 a*@3-7 g="Aa b." b@9-15 c@17-22 | sep 7-9 15-17 | authored ["a b."]
## replace 3-6
edit: "# Tza b.\n\nBb c.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." b@10-15 c@17-22 | sep 8-10 15-17 | authored ["za b."]
undo: original
redo: edit
uncheck b: "# Tza b.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." c@10-15 | sep 8-10 | authored ["za b."]
change b: "# Tza b.\n\nNew b.\n\nCc d." | title@0-3 a*@4-8 g="Aa b." b@10-16 c@18-23 | sep 8-10 16-18 | authored ["za b."]
## delete 4-7
edit: "# T\n b.\n\nBb c.\n\nCc d." | title@0-3 a*@4-7 g="Aa b." b@9-14 c@16-21 | sep 3-4 7-9 14-16 | authored [" b."]
undo: original
redo: edit
uncheck b: "# T\n b.\n\nCc d." | title@0-3 a*@4-7 g="Aa b." c@9-14 | sep 3-4 7-9 | authored [" b."]
change b: "# T\n b.\n\nNew b.\n\nCc d." | title@0-3 a*@4-7 g="Aa b." b@9-15 c@17-22 | sep 3-4 7-9 15-17 | authored [" b."]
## replace 4-7
edit: "# T\nz b.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-4 8-10 15-17 | authored ["z b."]
undo: original
redo: edit
uncheck b: "# T\nz b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-4 8-10 | authored ["z b."]
change b: "# T\nz b.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-4 8-10 16-18 | authored ["z b."]
## delete 5-8
edit: "# T\n\nb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-14 c@16-21 | sep 3-5 7-9 14-16 | authored ["b."]
undo: original
redo: edit
uncheck b: "# T\n\nb.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@9-14 | sep 3-5 7-9 | authored ["b."]
change b: "# T\n\nb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-15 c@17-22 | sep 3-5 7-9 15-17 | authored ["b."]
## replace 5-8
edit: "# T\n\nzb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["zb."]
undo: original
redo: edit
uncheck b: "# T\n\nzb.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["zb."]
change b: "# T\n\nzb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["zb."]
## delete 6-9
edit: "# T\n\nA.\n\nBb c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-14 c@16-21 | sep 3-5 7-9 14-16 | authored ["A."]
undo: original
redo: edit
uncheck b: "# T\n\nA.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@9-14 | sep 3-5 7-9 | authored ["A."]
change b: "# T\n\nA.\n\nNew b.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-15 c@17-22 | sep 3-5 7-9 15-17 | authored ["A."]
## replace 6-9
edit: "# T\n\nAz.\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["Az."]
undo: original
redo: edit
uncheck b: "# T\n\nAz.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Az."]
change b: "# T\n\nAz.\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["Az."]
## delete 7-10
edit: "# T\n\nAa\n\nBb c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-14 c@16-21 | sep 3-5 7-9 14-16 | authored ["Aa"]
undo: original
redo: edit
uncheck b: "# T\n\nAa\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@9-14 | sep 3-5 7-9 | authored ["Aa"]
change b: "# T\n\nAa\n\nNew b.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@9-15 c@17-22 | sep 3-5 7-9 15-17 | authored ["Aa"]
## replace 7-10
edit: "# T\n\nAaz\n\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 8-10 15-17 | authored ["Aaz"]
undo: original
redo: edit
uncheck b: "# T\n\nAaz\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Aaz"]
change b: "# T\n\nAaz\n\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 8-10 16-18 | authored ["Aaz"]
## delete 8-11
edit: "# T\n\nAa \nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@9-14 c@16-21 | sep 3-5 8-9 14-16 | authored ["Aa "]
undo: original
redo: edit
uncheck b: "# T\n\nAa \n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Aa "]
change b: "# T\n\nAa \nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@9-15 c@17-22 | sep 3-5 8-9 15-17 | authored ["Aa "]
## replace 8-11
edit: "# T\n\nAa z\nBb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-15 c@17-22 | sep 3-5 9-10 15-17 | authored ["Aa z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa z\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa z"]
change b: "# T\n\nAa z\nNew b.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b@10-16 c@18-23 | sep 3-5 9-10 16-18 | authored ["Aa z"]
## delete 9-12
edit: "# T\n\nAa bBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@9-14 c@16-21 | sep 3-5 14-16 | authored ["Aa b"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@11-16 | sep 3-5 9-11 | authored ["Aa b"]
change b: "# T\n\nAa bNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@9-15 c@17-22 | sep 3-5 15-17 | authored ["Aa b"]
## replace 9-12
edit: "# T\n\nAa bzBb c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@10-15 c@17-22 | sep 3-5 15-17 | authored ["Aa bz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa bz\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa bz"]
change b: "# T\n\nAa bzNew b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b@10-16 c@18-23 | sep 3-5 16-18 | authored ["Aa bz"]
## delete 10-13
edit: "# T\n\nAa b.b c.\n\nCc d." | title@0-3 a@5-10 b*@10-14 g="Bb c." c@16-21 | sep 3-5 14-16 | authored ["b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.b c.\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 14-16 | authored ["b c."]
change b: "# T\n\nAa b.b c.\n\nCc d." | title@0-3 a@5-10 b*@10-14 g="New b." c@16-21 | sep 3-5 14-16 | authored ["b c."]
## replace 10-13
edit: "# T\n\nAa b.zb c.\n\nCc d." | title@0-3 a@5-10 b*@11-15 g="Bb c." c@17-22 | sep 3-5 15-17 | authored ["zb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.zb c.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 15-17 | authored ["zb c."]
change b: "# T\n\nAa b.zb c.\n\nCc d." | title@0-3 a@5-10 b*@11-15 g="New b." c@17-22 | sep 3-5 15-17 | authored ["zb c."]
## delete 11-14
edit: "# T\n\nAa b.\n c.\n\nCc d." | title@0-3 a@5-10 b*@11-14 g="Bb c." c@16-21 | sep 3-5 10-11 14-16 | authored [" c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n c.\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-11 14-16 | authored [" c."]
change b: "# T\n\nAa b.\n c.\n\nCc d." | title@0-3 a@5-10 b*@11-14 g="New b." c@16-21 | sep 3-5 10-11 14-16 | authored [" c."]
## replace 11-14
edit: "# T\n\nAa b.\nz c.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-11 15-17 | authored ["z c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz c.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-11 15-17 | authored ["z c."]
change b: "# T\n\nAa b.\nz c.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-11 15-17 | authored ["z c."]
## delete 12-15
edit: "# T\n\nAa b.\n\nc.\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c@16-21 | sep 3-5 10-12 14-16 | authored ["c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nc.\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-12 14-16 | authored ["c."]
change b: "# T\n\nAa b.\n\nc.\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="New b." c@16-21 | sep 3-5 10-12 14-16 | authored ["c."]
## replace 12-15
edit: "# T\n\nAa b.\n\nzc.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["zc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzc.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["zc."]
change b: "# T\n\nAa b.\n\nzc.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["zc."]
## delete 13-16
edit: "# T\n\nAa b.\n\nB.\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c@16-21 | sep 3-5 10-12 14-16 | authored ["B."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB.\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-12 14-16 | authored ["B."]
change b: "# T\n\nAa b.\n\nB.\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="New b." c@16-21 | sep 3-5 10-12 14-16 | authored ["B."]
## replace 13-16
edit: "# T\n\nAa b.\n\nBz.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBz.\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["Bz."]
change b: "# T\n\nAa b.\n\nBz.\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bz."]
## delete 14-17
edit: "# T\n\nAa b.\n\nBb\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c@16-21 | sep 3-5 10-12 14-16 | authored ["Bb"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb\n\nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-12 14-16 | authored ["Bb"]
change b: "# T\n\nAa b.\n\nBb\n\nCc d." | title@0-3 a@5-10 b*@12-14 g="New b." c@16-21 | sep 3-5 10-12 14-16 | authored ["Bb"]
## replace 14-17
edit: "# T\n\nAa b.\n\nBbz\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bbz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbz\n\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 15-17 | authored ["Bbz"]
change b: "# T\n\nAa b.\n\nBbz\n\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 15-17 | authored ["Bbz"]
## delete 15-18
edit: "# T\n\nAa b.\n\nBb \nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@16-21 | sep 3-5 10-12 15-16 | authored ["Bb "]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb \nCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-12 15-16 | authored ["Bb "]
change b: "# T\n\nAa b.\n\nBb \nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@16-21 | sep 3-5 10-12 15-16 | authored ["Bb "]
## replace 15-18
edit: "# T\n\nAa b.\n\nBb z\nCc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb z\nCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb z"]
change b: "# T\n\nAa b.\n\nBb z\nCc d." | title@0-3 a@5-10 b*@12-15 g="New b." c@17-22 | sep 3-5 10-12 16-17 | authored ["Bb z"]
## delete 16-19
edit: "# T\n\nAa b.\n\nBb cCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@16-21 | sep 3-5 10-12 | authored ["Bb c"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cCc d." | title@0-3 a@5-10 c@16-21 | sep 3-5 10-12 | authored ["Bb c"]
change b: "# T\n\nAa b.\n\nBb cCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@16-21 | sep 3-5 10-12 | authored ["Bb c"]
## replace 16-19
edit: "# T\n\nAa b.\n\nBb czCc d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c@17-22 | sep 3-5 10-12 | authored ["Bb cz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb czCc d." | title@0-3 a@5-10 c@17-22 | sep 3-5 10-12 | authored ["Bb cz"]
change b: "# T\n\nAa b.\n\nBb czCc d." | title@0-3 a@5-10 b*@12-16 g="New b." c@17-22 | sep 3-5 10-12 | authored ["Bb cz"]
## delete 17-20
edit: "# T\n\nAa b.\n\nBb c.c d." | title@0-3 a@5-10 b@12-17 c*@17-21 g="Cc d." | sep 3-5 10-12 | authored ["c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nc d." | title@0-3 a@5-10 c*@12-16 g="Cc d." | sep 3-5 10-12 | authored ["c d."]
change b: "# T\n\nAa b.\n\nNew b.c d." | title@0-3 a@5-10 b@12-18 c*@18-22 g="Cc d." | sep 3-5 10-12 | authored ["c d."]
## replace 17-20
edit: "# T\n\nAa b.\n\nBb c.zc d." | title@0-3 a@5-10 b@12-17 c*@18-22 g="Cc d." | sep 3-5 10-12 | authored ["zc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzc d." | title@0-3 a@5-10 c*@13-17 g="Cc d." | sep 3-5 10-12 | authored ["zc d."]
change b: "# T\n\nAa b.\n\nNew b.zc d." | title@0-3 a@5-10 b@12-18 c*@19-23 g="Cc d." | sep 3-5 10-12 | authored ["zc d."]
## delete 18-21
edit: "# T\n\nAa b.\n\nBb c.\n d." | title@0-3 a@5-10 b@12-17 c*@18-21 g="Cc d." | sep 3-5 10-12 17-18 | authored [" d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n d." | title@0-3 a@5-10 c*@11-14 g="Cc d." | sep 3-5 10-11 | authored [" d."]
change b: "# T\n\nAa b.\n\nNew b.\n d." | title@0-3 a@5-10 b@12-18 c*@19-22 g="Cc d." | sep 3-5 10-12 18-19 | authored [" d."]
## replace 18-21
edit: "# T\n\nAa b.\n\nBb c.\nz d." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-18 | authored ["z d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz d." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-11 | authored ["z d."]
change b: "# T\n\nAa b.\n\nNew b.\nz d." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-19 | authored ["z d."]
## delete 19-22
edit: "# T\n\nAa b.\n\nBb c.\n\nd." | title@0-3 a@5-10 b@12-17 c*@19-21 g="Cc d." | sep 3-5 10-12 17-19 | authored ["d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nd." | title@0-3 a@5-10 c*@12-14 g="Cc d." | sep 3-5 10-12 | authored ["d."]
change b: "# T\n\nAa b.\n\nNew b.\n\nd." | title@0-3 a@5-10 b@12-18 c*@20-22 g="Cc d." | sep 3-5 10-12 18-20 | authored ["d."]
## replace 19-22
edit: "# T\n\nAa b.\n\nBb c.\n\nzd." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["zd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzd." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["zd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nzd." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["zd."]
## delete 20-23
edit: "# T\n\nAa b.\n\nBb c.\n\nC." | title@0-3 a@5-10 b@12-17 c*@19-21 g="Cc d." | sep 3-5 10-12 17-19 | authored ["C."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nC." | title@0-3 a@5-10 c*@12-14 g="Cc d." | sep 3-5 10-12 | authored ["C."]
change b: "# T\n\nAa b.\n\nNew b.\n\nC." | title@0-3 a@5-10 b@12-18 c*@20-22 g="Cc d." | sep 3-5 10-12 18-20 | authored ["C."]
## replace 20-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCz." | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCz." | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["Cz."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCz." | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cz."]
## delete 21-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCc" | title@0-3 a@5-10 b@12-17 c*@19-21 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cc"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc" | title@0-3 a@5-10 c*@12-14 g="Cc d." | sep 3-5 10-12 | authored ["Cc"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCc" | title@0-3 a@5-10 b@12-18 c*@20-22 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cc"]
## replace 21-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCcz" | title@0-3 a@5-10 b@12-17 c*@19-22 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcz" | title@0-3 a@5-10 c*@12-15 g="Cc d." | sep 3-5 10-12 | authored ["Ccz"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcz" | title@0-3 a@5-10 b@12-18 c*@20-23 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccz"]
## delete 0-5
edit: "Aa b.\n\nBb c.\n\nCc d." | title*@0-0 g="# T" a@0-5 b@7-12 c@14-19 | sep 5-7 12-14 | authored []
undo: original
redo: edit
uncheck b: "Aa b.\n\nCc d." | title*@0-0 g="# T" a@0-5 c@7-12 | sep 5-7 | authored []
change b: "Aa b.\n\nNew b.\n\nCc d." | title*@0-0 g="# T" a@0-5 b@7-13 c@15-20 | sep 5-7 13-15 | authored []
## replace 0-5
edit: "zAa b.\n\nBb c.\n\nCc d." | title*@0-0 g="# T" a@1-6 b@8-13 c@15-20 | sep 6-8 13-15 | authored ["z"]
undo: original
redo: edit
uncheck b: "zAa b.\n\nCc d." | title*@0-0 g="# T" a@1-6 c@8-13 | sep 6-8 | authored ["z"]
change b: "zAa b.\n\nNew b.\n\nCc d." | title*@0-0 g="# T" a@1-6 b@8-14 c@16-21 | sep 6-8 14-16 | authored ["z"]
## delete 1-6
edit: "#a b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a*@1-5 g="Aa b." b@7-12 c@14-19 | sep 5-7 12-14 | authored ["#a b."]
undo: original
redo: edit
uncheck b: "#a b.\n\nCc d." | title*@0-1 g="# T" a*@1-5 g="Aa b." c@7-12 | sep 5-7 | authored ["#a b."]
change b: "#a b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a*@1-5 g="Aa b." b@7-13 c@15-20 | sep 5-7 13-15 | authored ["#a b."]
## replace 1-6
edit: "#za b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a*@2-6 g="Aa b." b@8-13 c@15-20 | sep 6-8 13-15 | authored ["#za b."]
undo: original
redo: edit
uncheck b: "#za b.\n\nCc d." | title*@0-1 g="# T" a*@2-6 g="Aa b." c@8-13 | sep 6-8 | authored ["#za b."]
change b: "#za b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a*@2-6 g="Aa b." b@8-14 c@16-21 | sep 6-8 14-16 | authored ["#za b."]
## delete 2-7
edit: "#  b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a*@2-5 g="Aa b." b@7-12 c@14-19 | sep 5-7 12-14 | authored ["#  b."]
undo: original
redo: edit
uncheck b: "#  b.\n\nCc d." | title*@0-2 g="# T" a*@2-5 g="Aa b." c@7-12 | sep 5-7 | authored ["#  b."]
change b: "#  b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a*@2-5 g="Aa b." b@7-13 c@15-20 | sep 5-7 13-15 | authored ["#  b."]
## replace 2-7
edit: "# z b.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a*@3-6 g="Aa b." b@8-13 c@15-20 | sep 6-8 13-15 | authored ["# z b."]
undo: original
redo: edit
uncheck b: "# z b.\n\nCc d." | title*@0-2 g="# T" a*@3-6 g="Aa b." c@8-13 | sep 6-8 | authored ["# z b."]
change b: "# z b.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a*@3-6 g="Aa b." b@8-14 c@16-21 | sep 6-8 14-16 | authored ["# z b."]
## delete 3-8
edit: "# Tb.\n\nBb c.\n\nCc d." | title@0-3 a*@3-5 g="Aa b." b@7-12 c@14-19 | sep 5-7 12-14 | authored ["b."]
undo: original
redo: edit
uncheck b: "# Tb.\n\nCc d." | title@0-3 a*@3-5 g="Aa b." c@7-12 | sep 5-7 | authored ["b."]
change b: "# Tb.\n\nNew b.\n\nCc d." | title@0-3 a*@3-5 g="Aa b." b@7-13 c@15-20 | sep 5-7 13-15 | authored ["b."]
## replace 3-8
edit: "# Tzb.\n\nBb c.\n\nCc d." | title@0-3 a*@4-6 g="Aa b." b@8-13 c@15-20 | sep 6-8 13-15 | authored ["zb."]
undo: original
redo: edit
uncheck b: "# Tzb.\n\nCc d." | title@0-3 a*@4-6 g="Aa b." c@8-13 | sep 6-8 | authored ["zb."]
change b: "# Tzb.\n\nNew b.\n\nCc d." | title@0-3 a*@4-6 g="Aa b." b@8-14 c@16-21 | sep 6-8 14-16 | authored ["zb."]
## delete 4-9
edit: "# T\n.\n\nBb c.\n\nCc d." | title@0-3 a*@4-5 g="Aa b." b@7-12 c@14-19 | sep 3-4 5-7 12-14 | authored ["."]
undo: original
redo: edit
uncheck b: "# T\n.\n\nCc d." | title@0-3 a*@4-5 g="Aa b." c@7-12 | sep 3-4 5-7 | authored ["."]
change b: "# T\n.\n\nNew b.\n\nCc d." | title@0-3 a*@4-5 g="Aa b." b@7-13 c@15-20 | sep 3-4 5-7 13-15 | authored ["."]
## replace 4-9
edit: "# T\nz.\n\nBb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-13 c@15-20 | sep 3-4 6-8 13-15 | authored ["z."]
undo: original
redo: edit
uncheck b: "# T\nz.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@8-13 | sep 3-4 6-8 | authored ["z."]
change b: "# T\nz.\n\nNew b.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-14 c@16-21 | sep 3-4 6-8 14-16 | authored ["z."]
## delete 5-10
edit: "# T\n\n\n\nBb c.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@7-12 c@14-19 | sep 3-5 5-7 12-14 | authored []
undo: original
redo: edit
uncheck b: "# T\n\n\n\nCc d." | title@0-3 a*@5-5 g="Aa b." c@7-12 | sep 3-5 5-7 | authored []
change b: "# T\n\n\n\nNew b.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@7-13 c@15-20 | sep 3-5 5-7 13-15 | authored []
## replace 5-10
edit: "# T\n\nz\n\nBb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-13 c@15-20 | sep 3-5 6-8 13-15 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nz\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@8-13 | sep 3-5 6-8 | authored ["z"]
change b: "# T\n\nz\n\nNew b.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-14 c@16-21 | sep 3-5 6-8 14-16 | authored ["z"]
## delete 6-11
edit: "# T\n\nA\nBb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@7-12 c@14-19 | sep 3-5 6-7 12-14 | authored ["A"]
undo: original
redo: edit
uncheck b: "# T\n\nA\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@8-13 | sep 3-5 6-8 | authored ["A"]
change b: "# T\n\nA\nNew b.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@7-13 c@15-20 | sep 3-5 6-7 13-15 | authored ["A"]
## replace 6-11
edit: "# T\n\nAz\nBb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-13 c@15-20 | sep 3-5 7-8 13-15 | authored ["Az"]
undo: original
redo: edit
uncheck b: "# T\n\nAz\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@9-14 | sep 3-5 7-9 | authored ["Az"]
change b: "# T\n\nAz\nNew b.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b@8-14 c@16-21 | sep 3-5 7-8 14-16 | authored ["Az"]
## delete 7-12
edit: "# T\n\nAaBb c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@7-12 c@14-19 | sep 3-5 12-14 | authored ["Aa"]
undo: original
redo: edit
uncheck b: "# T\n\nAa\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@9-14 | sep 3-5 7-9 | authored ["Aa"]
change b: "# T\n\nAaNew b.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@7-13 c@15-20 | sep 3-5 13-15 | authored ["Aa"]
## replace 7-12
edit: "# T\n\nAazBb c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@8-13 c@15-20 | sep 3-5 13-15 | authored ["Aaz"]
undo: original
redo: edit
uncheck b: "# T\n\nAaz\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@10-15 | sep 3-5 8-10 | authored ["Aaz"]
change b: "# T\n\nAazNew b.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b@8-14 c@16-21 | sep 3-5 14-16 | authored ["Aaz"]
## delete 8-13
edit: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@8-12 g="Bb c." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
change b: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@8-12 g="New b." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
## replace 8-13
edit: "# T\n\nAa zb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@9-13 g="Bb c." c@15-20 | sep 3-5 13-15 | authored ["Aa zb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa zb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa zb c."]
change b: "# T\n\nAa zb c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@9-13 g="New b." c@15-20 | sep 3-5 13-15 | authored ["Aa zb c."]
## delete 9-14
edit: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@9-12 g="Bb c." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
change b: "# T\n\nAa b c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@9-12 g="New b." c@14-19 | sep 3-5 12-14 | authored ["Aa b c."]
## replace 9-14
edit: "# T\n\nAa bz c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@10-13 g="Bb c." c@15-20 | sep 3-5 13-15 | authored ["Aa bz c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bz c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@15-20 | sep 3-5 13-15 | authored ["Aa bz c."]
change b: "# T\n\nAa bz c.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@10-13 g="New b." c@15-20 | sep 3-5 13-15 | authored ["Aa bz c."]
## delete 10-15
edit: "# T\n\nAa b.c.\n\nCc d." | title@0-3 a@5-10 b*@10-12 g="Bb c." c@14-19 | sep 3-5 12-14 | authored ["c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.c.\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 12-14 | authored ["c."]
change b: "# T\n\nAa b.c.\n\nCc d." | title@0-3 a@5-10 b*@10-12 g="New b." c@14-19 | sep 3-5 12-14 | authored ["c."]
## replace 10-15
edit: "# T\n\nAa b.zc.\n\nCc d." | title@0-3 a@5-10 b*@11-13 g="Bb c." c@15-20 | sep 3-5 13-15 | authored ["zc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.zc.\n\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 13-15 | authored ["zc."]
change b: "# T\n\nAa b.zc.\n\nCc d." | title@0-3 a@5-10 b*@11-13 g="New b." c@15-20 | sep 3-5 13-15 | authored ["zc."]
## delete 11-16
edit: "# T\n\nAa b.\n.\n\nCc d." | title@0-3 a@5-10 b*@11-12 g="Bb c." c@14-19 | sep 3-5 10-11 12-14 | authored ["."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n.\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-11 12-14 | authored ["."]
change b: "# T\n\nAa b.\n.\n\nCc d." | title@0-3 a@5-10 b*@11-12 g="New b." c@14-19 | sep 3-5 10-11 12-14 | authored ["."]
## replace 11-16
edit: "# T\n\nAa b.\nz.\n\nCc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c@15-20 | sep 3-5 10-11 13-15 | authored ["z."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz.\n\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-11 13-15 | authored ["z."]
change b: "# T\n\nAa b.\nz.\n\nCc d." | title@0-3 a@5-10 b*@12-13 g="New b." c@15-20 | sep 3-5 10-11 13-15 | authored ["z."]
## delete 12-17
edit: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 b*@12-12 g="Bb c." c@14-19 | sep 3-5 10-12 12-14 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 12-14 | authored []
change b: "# T\n\nAa b.\n\n\n\nCc d." | title@0-3 a@5-10 b*@12-12 g="New b." c@14-19 | sep 3-5 10-12 12-14 | authored []
## replace 12-17
edit: "# T\n\nAa b.\n\nz\n\nCc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c@15-20 | sep 3-5 10-12 13-15 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz\n\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-12 13-15 | authored ["z"]
change b: "# T\n\nAa b.\n\nz\n\nCc d." | title@0-3 a@5-10 b*@12-13 g="New b." c@15-20 | sep 3-5 10-12 13-15 | authored ["z"]
## delete 13-18
edit: "# T\n\nAa b.\n\nB\nCc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c@14-19 | sep 3-5 10-12 13-14 | authored ["B"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nB\nCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 13-14 | authored ["B"]
change b: "# T\n\nAa b.\n\nB\nCc d." | title@0-3 a@5-10 b*@12-13 g="New b." c@14-19 | sep 3-5 10-12 13-14 | authored ["B"]
## replace 13-18
edit: "# T\n\nAa b.\n\nBz\nCc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c@15-20 | sep 3-5 10-12 14-15 | authored ["Bz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBz\nCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-12 14-15 | authored ["Bz"]
change b: "# T\n\nAa b.\n\nBz\nCc d." | title@0-3 a@5-10 b*@12-13 g="New b." c@15-20 | sep 3-5 10-12 14-15 | authored ["Bz"]
## delete 14-19
edit: "# T\n\nAa b.\n\nBbCc d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c@14-19 | sep 3-5 10-12 | authored ["Bb"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbCc d." | title@0-3 a@5-10 c@14-19 | sep 3-5 10-12 | authored ["Bb"]
change b: "# T\n\nAa b.\n\nBbCc d." | title@0-3 a@5-10 b*@12-14 g="New b." c@14-19 | sep 3-5 10-12 | authored ["Bb"]
## replace 14-19
edit: "# T\n\nAa b.\n\nBbzCc d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c@15-20 | sep 3-5 10-12 | authored ["Bbz"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbzCc d." | title@0-3 a@5-10 c@15-20 | sep 3-5 10-12 | authored ["Bbz"]
change b: "# T\n\nAa b.\n\nBbzCc d." | title@0-3 a@5-10 b*@12-14 g="New b." c@15-20 | sep 3-5 10-12 | authored ["Bbz"]
## delete 15-20
edit: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c*@15-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 c*@15-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
change b: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 b*@12-15 g="New b." c*@15-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
## replace 15-20
edit: "# T\n\nAa b.\n\nBb zc d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c*@16-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb zc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb zc d." | title@0-3 a@5-10 c*@16-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb zc d."]
change b: "# T\n\nAa b.\n\nBb zc d." | title@0-3 a@5-10 b*@12-15 g="New b." c*@16-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb zc d."]
## delete 16-21
edit: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c*@16-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 c*@16-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
change b: "# T\n\nAa b.\n\nBb c d." | title@0-3 a@5-10 b*@12-16 g="New b." c*@16-19 g="Cc d." | sep 3-5 10-12 | authored ["Bb c d."]
## replace 16-21
edit: "# T\n\nAa b.\n\nBb cz d." | title@0-3 a@5-10 b*@12-16 g="Bb c." c*@17-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cz d." | title@0-3 a@5-10 c*@17-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz d."]
change b: "# T\n\nAa b.\n\nBb cz d." | title@0-3 a@5-10 b*@12-16 g="New b." c*@17-20 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz d."]
## delete 17-22
edit: "# T\n\nAa b.\n\nBb c.d." | title@0-3 a@5-10 b@12-17 c*@17-19 g="Cc d." | sep 3-5 10-12 | authored ["d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nd." | title@0-3 a@5-10 c*@12-14 g="Cc d." | sep 3-5 10-12 | authored ["d."]
change b: "# T\n\nAa b.\n\nNew b.d." | title@0-3 a@5-10 b@12-18 c*@18-20 g="Cc d." | sep 3-5 10-12 | authored ["d."]
## replace 17-22
edit: "# T\n\nAa b.\n\nBb c.zd." | title@0-3 a@5-10 b@12-17 c*@18-20 g="Cc d." | sep 3-5 10-12 | authored ["zd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzd." | title@0-3 a@5-10 c*@13-15 g="Cc d." | sep 3-5 10-12 | authored ["zd."]
change b: "# T\n\nAa b.\n\nNew b.zd." | title@0-3 a@5-10 b@12-18 c*@19-21 g="Cc d." | sep 3-5 10-12 | authored ["zd."]
## delete 18-23
edit: "# T\n\nAa b.\n\nBb c.\n." | title@0-3 a@5-10 b@12-17 c*@18-19 g="Cc d." | sep 3-5 10-12 17-18 | authored ["."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n." | title@0-3 a@5-10 c*@11-12 g="Cc d." | sep 3-5 10-11 | authored ["."]
change b: "# T\n\nAa b.\n\nNew b.\n." | title@0-3 a@5-10 b@12-18 c*@19-20 g="Cc d." | sep 3-5 10-12 18-19 | authored ["."]
## replace 18-23
edit: "# T\n\nAa b.\n\nBb c.\nz." | title@0-3 a@5-10 b@12-17 c*@19-20 g="Cc d." | sep 3-5 10-12 17-18 | authored ["z."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz." | title@0-3 a@5-10 c*@12-13 g="Cc d." | sep 3-5 10-11 | authored ["z."]
change b: "# T\n\nAa b.\n\nNew b.\nz." | title@0-3 a@5-10 b@12-18 c*@20-21 g="Cc d." | sep 3-5 10-12 18-19 | authored ["z."]
## delete 19-24
edit: "# T\n\nAa b.\n\nBb c.\n\n" | title@0-3 a@5-10 b@12-17 c*@19-19 g="Cc d." | sep 3-5 10-12 17-19 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\n" | title@0-3 a@5-10 c*@12-12 g="Cc d." | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\n\nNew b.\n\n" | title@0-3 a@5-10 b@12-18 c*@20-20 g="Cc d." | sep 3-5 10-12 18-20 | authored []
## replace 19-24
edit: "# T\n\nAa b.\n\nBb c.\n\nz" | title@0-3 a@5-10 b@12-17 c*@19-20 g="Cc d." | sep 3-5 10-12 17-19 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz" | title@0-3 a@5-10 c*@12-13 g="Cc d." | sep 3-5 10-12 | authored ["z"]
change b: "# T\n\nAa b.\n\nNew b.\n\nz" | title@0-3 a@5-10 b@12-18 c*@20-21 g="Cc d." | sep 3-5 10-12 18-20 | authored ["z"]
## delete 0-7
edit: " b.\n\nBb c.\n\nCc d." | title*@0-0 g="# T" a*@0-3 g="Aa b." b@5-10 c@12-17 | sep 3-5 10-12 | authored [" b."]
undo: original
redo: edit
uncheck b: " b.\n\nCc d." | title*@0-0 g="# T" a*@0-3 g="Aa b." c@5-10 | sep 3-5 | authored [" b."]
change b: " b.\n\nNew b.\n\nCc d." | title*@0-0 g="# T" a*@0-3 g="Aa b." b@5-11 c@13-18 | sep 3-5 11-13 | authored [" b."]
## replace 0-7
edit: "z b.\n\nBb c.\n\nCc d." | title*@0-0 g="# T" a*@1-4 g="Aa b." b@6-11 c@13-18 | sep 4-6 11-13 | authored ["z b."]
undo: original
redo: edit
uncheck b: "z b.\n\nCc d." | title*@0-0 g="# T" a*@1-4 g="Aa b." c@6-11 | sep 4-6 | authored ["z b."]
change b: "z b.\n\nNew b.\n\nCc d." | title*@0-0 g="# T" a*@1-4 g="Aa b." b@6-12 c@14-19 | sep 4-6 12-14 | authored ["z b."]
## delete 1-8
edit: "#b.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a*@1-3 g="Aa b." b@5-10 c@12-17 | sep 3-5 10-12 | authored ["#b."]
undo: original
redo: edit
uncheck b: "#b.\n\nCc d." | title*@0-1 g="# T" a*@1-3 g="Aa b." c@5-10 | sep 3-5 | authored ["#b."]
change b: "#b.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a*@1-3 g="Aa b." b@5-11 c@13-18 | sep 3-5 11-13 | authored ["#b."]
## replace 1-8
edit: "#zb.\n\nBb c.\n\nCc d." | title*@0-1 g="# T" a*@2-4 g="Aa b." b@6-11 c@13-18 | sep 4-6 11-13 | authored ["#zb."]
undo: original
redo: edit
uncheck b: "#zb.\n\nCc d." | title*@0-1 g="# T" a*@2-4 g="Aa b." c@6-11 | sep 4-6 | authored ["#zb."]
change b: "#zb.\n\nNew b.\n\nCc d." | title*@0-1 g="# T" a*@2-4 g="Aa b." b@6-12 c@14-19 | sep 4-6 12-14 | authored ["#zb."]
## delete 2-9
edit: "# .\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a*@2-3 g="Aa b." b@5-10 c@12-17 | sep 3-5 10-12 | authored ["# ."]
undo: original
redo: edit
uncheck b: "# .\n\nCc d." | title*@0-2 g="# T" a*@2-3 g="Aa b." c@5-10 | sep 3-5 | authored ["# ."]
change b: "# .\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a*@2-3 g="Aa b." b@5-11 c@13-18 | sep 3-5 11-13 | authored ["# ."]
## replace 2-9
edit: "# z.\n\nBb c.\n\nCc d." | title*@0-2 g="# T" a*@3-4 g="Aa b." b@6-11 c@13-18 | sep 4-6 11-13 | authored ["# z."]
undo: original
redo: edit
uncheck b: "# z.\n\nCc d." | title*@0-2 g="# T" a*@3-4 g="Aa b." c@6-11 | sep 4-6 | authored ["# z."]
change b: "# z.\n\nNew b.\n\nCc d." | title*@0-2 g="# T" a*@3-4 g="Aa b." b@6-12 c@14-19 | sep 4-6 12-14 | authored ["# z."]
## delete 3-10
edit: "# T\n\nBb c.\n\nCc d." | title@0-3 a*@3-3 g="Aa b." b@5-10 c@12-17 | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nCc d." | title@0-3 a*@3-3 g="Aa b." c@5-10 | sep 3-5 | authored []
change b: "# T\n\nNew b.\n\nCc d." | title@0-3 a*@3-3 g="Aa b." b@5-11 c@13-18 | sep 3-5 11-13 | authored []
## replace 3-10
edit: "# Tz\n\nBb c.\n\nCc d." | title@0-3 a*@4-4 g="Aa b." b@6-11 c@13-18 | sep 4-6 11-13 | authored ["z"]
undo: original
redo: edit
uncheck b: "# Tz\n\nCc d." | title@0-3 a*@4-4 g="Aa b." c@6-11 | sep 4-6 | authored ["z"]
change b: "# Tz\n\nNew b.\n\nCc d." | title@0-3 a*@4-4 g="Aa b." b@6-12 c@14-19 | sep 4-6 12-14 | authored ["z"]
## delete 4-11
edit: "# T\n\nBb c.\n\nCc d." | title@0-3 a*@4-4 g="Aa b." b@5-10 c@12-17 | sep 3-4 4-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\n\nCc d." | title@0-3 a*@4-4 g="Aa b." c@6-11 | sep 3-4 4-6 | authored []
change b: "# T\n\nNew b.\n\nCc d." | title@0-3 a*@4-4 g="Aa b." b@5-11 c@13-18 | sep 3-4 4-5 11-13 | authored []
## replace 4-11
edit: "# T\nz\nBb c.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@6-11 c@13-18 | sep 3-4 5-6 11-13 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\nz\n\nCc d." | title@0-3 a*@5-5 g="Aa b." c@7-12 | sep 3-4 5-7 | authored ["z"]
change b: "# T\nz\nNew b.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@6-12 c@14-19 | sep 3-4 5-6 12-14 | authored ["z"]
## delete 5-12
edit: "# T\n\nBb c.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@5-10 c@12-17 | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nCc d." | title@0-3 a*@3-3 g="Aa b." c@5-10 | sep 3-5 | authored []
change b: "# T\n\nNew b.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@5-11 c@13-18 | sep 3-5 11-13 | authored []
## replace 5-12
edit: "# T\n\nzBb c.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@6-11 c@13-18 | sep 3-5 11-13 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nz\n\nCc d." | title@0-3 a*@5-5 g="Aa b." c@8-13 | sep 3-5 6-8 | authored ["z"]
change b: "# T\n\nzNew b.\n\nCc d." | title@0-3 a*@5-5 g="Aa b." b@6-12 c@14-19 | sep 3-5 12-14 | authored ["z"]
## delete 6-13
edit: "# T\n\nAb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b*@6-10 g="Bb c." c@12-17 | sep 3-5 10-12 | authored ["Ab c."]
undo: original
redo: edit
uncheck b: "# T\n\nAb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Ab c."]
change b: "# T\n\nAb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b*@6-10 g="New b." c@12-17 | sep 3-5 10-12 | authored ["Ab c."]
## replace 6-13
edit: "# T\n\nAzb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b*@7-11 g="Bb c." c@13-18 | sep 3-5 11-13 | authored ["Azb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAzb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Azb c."]
change b: "# T\n\nAzb c.\n\nCc d." | title@0-3 a*@5-6 g="Aa b." b*@7-11 g="New b." c@13-18 | sep 3-5 11-13 | authored ["Azb c."]
## delete 7-14
edit: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b*@7-10 g="Bb c." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
change b: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b*@7-10 g="New b." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
## replace 7-14
edit: "# T\n\nAaz c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b*@8-11 g="Bb c." c@13-18 | sep 3-5 11-13 | authored ["Aaz c."]
undo: original
redo: edit
uncheck b: "# T\n\nAaz c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aaz c."]
change b: "# T\n\nAaz c.\n\nCc d." | title@0-3 a*@5-7 g="Aa b." b*@8-11 g="New b." c@13-18 | sep 3-5 11-13 | authored ["Aaz c."]
## delete 8-15
edit: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@8-10 g="Bb c." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
change b: "# T\n\nAa c.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@8-10 g="New b." c@12-17 | sep 3-5 10-12 | authored ["Aa c."]
## replace 8-15
edit: "# T\n\nAa zc.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@9-11 g="Bb c." c@13-18 | sep 3-5 11-13 | authored ["Aa zc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa zc.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa zc."]
change b: "# T\n\nAa zc.\n\nCc d." | title@0-3 a*@5-8 g="Aa b." b*@9-11 g="New b." c@13-18 | sep 3-5 11-13 | authored ["Aa zc."]
## delete 9-16
edit: "# T\n\nAa b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@9-10 g="Bb c." c@12-17 | sep 3-5 10-12 | authored ["Aa b."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@12-17 | sep 3-5 10-12 | authored ["Aa b."]
change b: "# T\n\nAa b.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@9-10 g="New b." c@12-17 | sep 3-5 10-12 | authored ["Aa b."]
## replace 9-16
edit: "# T\n\nAa bz.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@10-11 g="Bb c." c@13-18 | sep 3-5 11-13 | authored ["Aa bz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bz.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." c@13-18 | sep 3-5 11-13 | authored ["Aa bz."]
change b: "# T\n\nAa bz.\n\nCc d." | title@0-3 a*@5-9 g="Aa b." b*@10-11 g="New b." c@13-18 | sep 3-5 11-13 | authored ["Aa bz."]
## delete 10-17
edit: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@10-10 g="Bb c." c@12-17 | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@10-10 g="New b." c@12-17 | sep 3-5 10-12 | authored []
## replace 10-17
edit: "# T\n\nAa b.z\n\nCc d." | title@0-3 a@5-10 b*@11-11 g="Bb c." c@13-18 | sep 3-5 11-13 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.z\n\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 11-13 | authored ["z"]
change b: "# T\n\nAa b.z\n\nCc d." | title@0-3 a@5-10 b*@11-11 g="New b." c@13-18 | sep 3-5 11-13 | authored ["z"]
## delete 11-18
edit: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@11-11 g="Bb c." c@12-17 | sep 3-5 10-11 11-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-11 11-12 | authored []
change b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@11-11 g="New b." c@12-17 | sep 3-5 10-11 11-12 | authored []
## replace 11-18
edit: "# T\n\nAa b.\nz\nCc d." | title@0-3 a@5-10 b*@12-12 g="Bb c." c@13-18 | sep 3-5 10-11 12-13 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nz\nCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-11 12-13 | authored ["z"]
change b: "# T\n\nAa b.\nz\nCc d." | title@0-3 a@5-10 b*@12-12 g="New b." c@13-18 | sep 3-5 10-11 12-13 | authored ["z"]
## delete 12-19
edit: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@12-12 g="Bb c." c@12-17 | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 c@12-17 | sep 3-5 10-12 | authored []
change b: "# T\n\nAa b.\n\nCc d." | title@0-3 a@5-10 b*@12-12 g="New b." c@12-17 | sep 3-5 10-12 | authored []
## replace 12-19
edit: "# T\n\nAa b.\n\nzCc d." | title@0-3 a@5-10 b*@12-12 g="Bb c." c@13-18 | sep 3-5 10-12 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nzCc d." | title@0-3 a@5-10 c@13-18 | sep 3-5 10-12 | authored ["z"]
change b: "# T\n\nAa b.\n\nzCc d." | title@0-3 a@5-10 b*@12-12 g="New b." c@13-18 | sep 3-5 10-12 | authored ["z"]
## delete 13-20
edit: "# T\n\nAa b.\n\nBc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c*@13-17 g="Cc d." | sep 3-5 10-12 | authored ["Bc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBc d." | title@0-3 a@5-10 c*@13-17 g="Cc d." | sep 3-5 10-12 | authored ["Bc d."]
change b: "# T\n\nAa b.\n\nBc d." | title@0-3 a@5-10 b*@12-13 g="New b." c*@13-17 g="Cc d." | sep 3-5 10-12 | authored ["Bc d."]
## replace 13-20
edit: "# T\n\nAa b.\n\nBzc d." | title@0-3 a@5-10 b*@12-13 g="Bb c." c*@14-18 g="Cc d." | sep 3-5 10-12 | authored ["Bzc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBzc d." | title@0-3 a@5-10 c*@14-18 g="Cc d." | sep 3-5 10-12 | authored ["Bzc d."]
change b: "# T\n\nAa b.\n\nBzc d." | title@0-3 a@5-10 b*@12-13 g="New b." c*@14-18 g="Cc d." | sep 3-5 10-12 | authored ["Bzc d."]
## delete 14-21
edit: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c*@14-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 c*@14-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
change b: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 b*@12-14 g="New b." c*@14-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
## replace 14-21
edit: "# T\n\nAa b.\n\nBbz d." | title@0-3 a@5-10 b*@12-14 g="Bb c." c*@15-18 g="Cc d." | sep 3-5 10-12 | authored ["Bbz d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbz d." | title@0-3 a@5-10 c*@15-18 g="Cc d." | sep 3-5 10-12 | authored ["Bbz d."]
change b: "# T\n\nAa b.\n\nBbz d." | title@0-3 a@5-10 b*@12-14 g="New b." c*@15-18 g="Cc d." | sep 3-5 10-12 | authored ["Bbz d."]
## delete 15-22
edit: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 b*@12-15 g="Bb c." c*@15-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 c*@15-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
change b: "# T\n\nAa b.\n\nBb d." | title@0-3 a@5-10 b*@12-15 g="New b." c*@15-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb d."]
## replace 15-22
edit: "# T\n\nAa b.\n\nBb zd." | title@0-3 a@5-10 b*@12-15 g="Bb c." c*@16-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb zd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb zd." | title@0-3 a@5-10 c*@16-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb zd."]
change b: "# T\n\nAa b.\n\nBb zd." | title@0-3 a@5-10 b*@12-15 g="New b." c*@16-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb zd."]
## delete 16-23
edit: "# T\n\nAa b.\n\nBb c." | title@0-3 a@5-10 b*@12-16 g="Bb c." c*@16-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c." | title@0-3 a@5-10 c*@16-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb c."]
change b: "# T\n\nAa b.\n\nBb c." | title@0-3 a@5-10 b*@12-16 g="New b." c*@16-17 g="Cc d." | sep 3-5 10-12 | authored ["Bb c."]
## replace 16-23
edit: "# T\n\nAa b.\n\nBb cz." | title@0-3 a@5-10 b*@12-16 g="Bb c." c*@17-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cz." | title@0-3 a@5-10 c*@17-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz."]
change b: "# T\n\nAa b.\n\nBb cz." | title@0-3 a@5-10 b*@12-16 g="New b." c*@17-18 g="Cc d." | sep 3-5 10-12 | authored ["Bb cz."]
## delete 17-24
edit: "# T\n\nAa b.\n\nBb c." | title@0-3 a@5-10 b@12-17 c*@17-17 g="Cc d." | sep 3-5 10-12 | authored []
undo: original
redo: edit
uncheck b: "# T\n\nAa b." | title@0-3 a@5-10 c*@10-10 g="Cc d." | sep 3-5 | authored []
change b: "# T\n\nAa b.\n\nNew b." | title@0-3 a@5-10 b@12-18 c*@18-18 g="Cc d." | sep 3-5 10-12 | authored []
## replace 17-24
edit: "# T\n\nAa b.\n\nBb c.z" | title@0-3 a@5-10 b@12-17 c*@18-18 g="Cc d." | sep 3-5 10-12 | authored ["z"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nz" | title@0-3 a@5-10 c*@13-13 g="Cc d." | sep 3-5 10-12 | authored ["z"]
change b: "# T\n\nAa b.\n\nNew b.z" | title@0-3 a@5-10 b@12-18 c*@19-19 g="Cc d." | sep 3-5 10-12 | authored ["z"]
## insert around 0-3
edit: "x# Ty\n\nAa b.\n\nBb c.\n\nCc d." | title*@0-5 o=1-4 g="# T" a@7-12 b@14-19 c@21-26 | sep 5-7 12-14 19-21 | authored ["x# Ty"]
undo: original
redo: edit
uncheck b: "x# Ty\n\nAa b.\n\nCc d." | title*@0-5 o=1-4 g="# T" a@7-12 c@14-19 | sep 5-7 12-14 | authored ["x# Ty"]
change b: "x# Ty\n\nAa b.\n\nNew b.\n\nCc d." | title*@0-5 o=1-4 g="# T" a@7-12 b@14-20 c@22-27 | sep 5-7 12-14 20-22 | authored ["x# Ty"]
## insert around 1-4
edit: "#x T\ny\nAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a@7-12 b@14-19 c@21-26 | sep 4-5 6-7 12-14 19-21 | authored ["#x T","y"]
undo: original
redo: edit
uncheck b: "#x T\ny\nAa b.\n\nCc d." | title*@0-4 g="# T" a@7-12 c@14-19 | sep 4-5 6-7 12-14 | authored ["#x T","y"]
change b: "#x T\ny\nAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a@7-12 b@14-20 c@22-27 | sep 4-5 6-7 12-14 20-22 | authored ["#x T","y"]
## insert around 2-5
edit: "# xT\n\nyAa b.\n\nBb c.\n\nCc d." | title*@0-4 g="# T" a*@6-12 o=7-12 g="Aa b." b@14-19 c@21-26 | sep 4-6 12-14 19-21 | authored ["# xT","yAa b."]
undo: original
redo: edit
uncheck b: "# xT\n\nyAa b.\n\nCc d." | title*@0-4 g="# T" a*@6-12 o=7-12 g="Aa b." c@14-19 | sep 4-6 12-14 | authored ["# xT","yAa b."]
change b: "# xT\n\nyAa b.\n\nNew b.\n\nCc d." | title*@0-4 g="# T" a*@6-12 o=7-12 g="Aa b." b@14-20 c@22-27 | sep 4-6 12-14 20-22 | authored ["# xT","yAa b."]
## insert around 3-6
edit: "# Tx\n\nAya b.\n\nBb c.\n\nCc d." | title*@0-4 o=0-3 g="# T" a*@6-12 g="Aa b." b@14-19 c@21-26 | sep 4-6 12-14 19-21 | authored ["# Tx","Aya b."]
undo: original
redo: edit
uncheck b: "# Tx\n\nAya b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a*@6-12 g="Aa b." c@14-19 | sep 4-6 12-14 | authored ["# Tx","Aya b."]
change b: "# Tx\n\nAya b.\n\nNew b.\n\nCc d." | title*@0-4 o=0-3 g="# T" a*@6-12 g="Aa b." b@14-20 c@22-27 | sep 4-6 12-14 20-22 | authored ["# Tx","Aya b."]
## insert around 4-7
edit: "# T\nx\nAay b.\n\nBb c.\n\nCc d." | title@0-3 a*@6-12 g="Aa b." b@14-19 c@21-26 | sep 3-4 5-6 12-14 19-21 | authored ["x","Aay b."]
undo: original
redo: edit
uncheck b: "# T\nx\nAay b.\n\nCc d." | title@0-3 a*@6-12 g="Aa b." c@14-19 | sep 3-4 5-6 12-14 | authored ["x","Aay b."]
change b: "# T\nx\nAay b.\n\nNew b.\n\nCc d." | title@0-3 a*@6-12 g="Aa b." b@14-20 c@22-27 | sep 3-4 5-6 12-14 20-22 | authored ["x","Aay b."]
## insert around 5-8
edit: "# T\n\nxAa yb.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["xAa yb."]
undo: original
redo: edit
uncheck b: "# T\n\nxAa yb.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["xAa yb."]
change b: "# T\n\nxAa yb.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["xAa yb."]
## insert around 6-9
edit: "# T\n\nAxa by.\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["Axa by."]
undo: original
redo: edit
uncheck b: "# T\n\nAxa by.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Axa by."]
change b: "# T\n\nAxa by.\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["Axa by."]
## insert around 7-10
edit: "# T\n\nAax b.y\n\nBb c.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-19 c@21-26 | sep 3-5 12-14 19-21 | authored ["Aax b.y"]
undo: original
redo: edit
uncheck b: "# T\n\nAax b.y\n\nCc d." | title@0-3 a*@5-12 g="Aa b." c@14-19 | sep 3-5 12-14 | authored ["Aax b.y"]
change b: "# T\n\nAax b.y\n\nNew b.\n\nCc d." | title@0-3 a*@5-12 g="Aa b." b@14-20 c@22-27 | sep 3-5 12-14 20-22 | authored ["Aax b.y"]
## insert around 8-11
edit: "# T\n\nAa xb.\ny\nBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@14-19 c@21-26 | sep 3-5 11-12 13-14 19-21 | authored ["Aa xb.","y"]
undo: original
redo: edit
uncheck b: "# T\n\nAa xb.\ny\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@15-20 | sep 3-5 11-12 13-15 | authored ["Aa xb.","y"]
change b: "# T\n\nAa xb.\ny\nNew b.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b@14-20 c@22-27 | sep 3-5 11-12 13-14 20-22 | authored ["Aa xb.","y"]
## insert around 9-12
edit: "# T\n\nAa bx.\n\nyBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b*@13-19 o=14-19 g="Bb c." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa bx.","yBb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa bx.\n\nyBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa bx.","yBb c."]
change b: "# T\n\nAa bx.\n\nyBb c.\n\nCc d." | title@0-3 a*@5-11 g="Aa b." b*@13-19 g="New b." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa bx.","yBb c."]
## insert around 10-13
edit: "# T\n\nAa b.x\n\nByb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b*@13-19 g="Bb c." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b.x","Byb c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.x\n\nByb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b.x","Byb c."]
change b: "# T\n\nAa b.x\n\nByb c.\n\nCc d." | title@0-3 a*@5-11 o=5-10 g="Aa b." b*@13-19 g="New b." c@21-26 | sep 3-5 11-13 19-21 | authored ["Aa b.x","Byb c."]
## insert around 11-14
edit: "# T\n\nAa b.\nx\nBby c.\n\nCc d." | title@0-3 a@5-10 b*@13-19 g="Bb c." c@21-26 | sep 3-5 10-11 12-13 19-21 | authored ["x","Bby c."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\nBby c.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-11 12-13 19-21 | authored ["x","Bby c."]
change b: "# T\n\nAa b.\nx\nBby c.\n\nCc d." | title@0-3 a@5-10 b*@13-19 g="New b." c@21-26 | sep 3-5 10-11 12-13 19-21 | authored ["x","Bby c."]
## insert around 12-15
edit: "# T\n\nAa b.\n\nxBb yc.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["xBb yc."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxBb yc.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["xBb yc."]
change b: "# T\n\nAa b.\n\nxBb yc.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["xBb yc."]
## insert around 13-16
edit: "# T\n\nAa b.\n\nBxb cy.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bxb cy."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBxb cy.\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["Bxb cy."]
change b: "# T\n\nAa b.\n\nBxb cy.\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bxb cy."]
## insert around 14-17
edit: "# T\n\nAa b.\n\nBbx c.y\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="Bb c." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bbx c.y"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBbx c.y\n\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 19-21 | authored ["Bbx c.y"]
change b: "# T\n\nAa b.\n\nBbx c.y\n\nCc d." | title@0-3 a@5-10 b*@12-19 g="New b." c@21-26 | sep 3-5 10-12 19-21 | authored ["Bbx c.y"]
## insert around 15-18
edit: "# T\n\nAa b.\n\nBb xc.\ny\nCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c@21-26 | sep 3-5 10-12 18-19 20-21 | authored ["Bb xc.","y"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb xc.\ny\nCc d." | title@0-3 a@5-10 c@21-26 | sep 3-5 10-12 18-19 20-21 | authored ["Bb xc.","y"]
change b: "# T\n\nAa b.\n\nBb xc.\ny\nCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c@21-26 | sep 3-5 10-12 18-19 20-21 | authored ["Bb xc.","y"]
## insert around 16-19
edit: "# T\n\nAa b.\n\nBb cx.\n\nyCc d." | title@0-3 a@5-10 b*@12-18 g="Bb c." c*@20-26 o=21-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb cx.","yCc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb cx.\n\nyCc d." | title@0-3 a@5-10 c*@20-26 o=21-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb cx.","yCc d."]
change b: "# T\n\nAa b.\n\nBb cx.\n\nyCc d." | title@0-3 a@5-10 b*@12-18 g="New b." c*@20-26 o=21-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb cx.","yCc d."]
## insert around 17-20
edit: "# T\n\nAa b.\n\nBb c.x\n\nCyc d." | title@0-3 a@5-10 b*@12-18 o=12-17 g="Bb c." c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb c.x","Cyc d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nBb c.x\n\nCyc d." | title@0-3 a@5-10 c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb c.x","Cyc d."]
change b: "# T\n\nAa b.\n\nBb c.x\n\nCyc d." | title@0-3 a@5-10 b*@12-18 g="New b." c*@20-26 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Bb c.x","Cyc d."]
## insert around 18-21
edit: "# T\n\nAa b.\n\nBb c.\nx\nCcy d." | title@0-3 a@5-10 b@12-17 c*@20-26 g="Cc d." | sep 3-5 10-12 17-18 19-20 | authored ["x","Ccy d."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\nx\nCcy d." | title@0-3 a@5-10 c*@13-19 g="Cc d." | sep 3-5 10-11 12-13 | authored ["x","Ccy d."]
change b: "# T\n\nAa b.\n\nNew b.\nx\nCcy d." | title@0-3 a@5-10 b@12-18 c*@21-27 g="Cc d." | sep 3-5 10-12 18-19 20-21 | authored ["x","Ccy d."]
## insert around 19-22
edit: "# T\n\nAa b.\n\nBb c.\n\nxCc yd." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["xCc yd."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nxCc yd." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["xCc yd."]
change b: "# T\n\nAa b.\n\nNew b.\n\nxCc yd." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["xCc yd."]
## insert around 20-23
edit: "# T\n\nAa b.\n\nBb c.\n\nCxc dy." | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Cxc dy."]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCxc dy." | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["Cxc dy."]
change b: "# T\n\nAa b.\n\nNew b.\n\nCxc dy." | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Cxc dy."]
## insert around 21-24
edit: "# T\n\nAa b.\n\nBb c.\n\nCcx d.y" | title@0-3 a@5-10 b@12-17 c*@19-26 g="Cc d." | sep 3-5 10-12 17-19 | authored ["Ccx d.y"]
undo: original
redo: edit
uncheck b: "# T\n\nAa b.\n\nCcx d.y" | title@0-3 a@5-10 c*@12-19 g="Cc d." | sep 3-5 10-12 | authored ["Ccx d.y"]
change b: "# T\n\nAa b.\n\nNew b.\n\nCcx d.y" | title@0-3 a@5-10 b@12-18 c*@20-27 g="Cc d." | sep 3-5 10-12 18-20 | authored ["Ccx d.y"]
