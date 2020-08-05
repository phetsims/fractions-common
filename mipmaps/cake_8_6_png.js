/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 219,
    "height": 166,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAACmCAYAAABTP/pfAAAAAklEQVR4AewaftIAACILSURBVO3BCbClZ33f+e//ebez3637rr2rJbXQgiTAxhhhNmFMHFLUGLDBEzt2wDZ2krFT41R5KinV1MwUiePYTnlM4rFjQDaYTUIswUJYC1JAoJaEtla3uiX1vnfffTvnfZ/fnHuvWupFElouN33o5/MxSQRB8KPnCIJgRTiCIFgRjiAIVoQjCIIV4QiCYEU4giBYEY4gCFaEIwiCFeEIgmBFOIIgWBGOIAhWhCMIghXhCIJgRTiCIFgRjiAIVoQjCIIV4QiCYEU4giBYEY4gCFaEIwiCFeEIgmBFOIIgWBGOIAhWhCMIghXhCIJgRTiCIFgRjiAIVoQjCIIV4QiCYEU4giBYEY4gCFaEIwiCFeEIgmBFOIIgWBGOIAhWhCMIghXhCIJgRTiCIFgRjiAIVoQjCIIV4QiCYEU4giBYEY4gCFaEIwiCFeEIgmBFOIJldfPNN//cu3/2XV/fsWPHRoLgNI5g2Xjv+cM//Pi//dZtt73nT//0T/4VQXAaR7BsnHOsXbPmxPBQD61ms04QnMYRLDMraGs2m2WC4DSOYFmtWrXqMG3Hjh3tJwhO4wiWzUMPPXTxQ4889Npapc6TTz9x5Z/++R/9dpEXRhC0OYJlsXPHkyP/+t//01ubq/a+URbRtYH+//7Ef/6zP/zjf/+7BEFbTLAsDhw8MDKr0Y1X/cw6Tl48S7U7ZWp6gkMndl/OMjo+Olprzc1nQ0ODJwg6SkywPDxaNVLnte8YIUoczdmCpx87hB71Kctg74GDvbd8/u9+8Ws3/tX/Xlt70X1fuuUrHyDoKDHBsujt7TtBM5l1EeW0FIGHKI44MnZ0kFdIwH33P7Dl5hs/+Rs77v7Wh3qLqf6NiAPz89sJOk5MsCyiKMp9QVEUHu+FgCg2kizi5ZqenYu/+c1b3/b3n/ub3zz+yNb3DGVWem1vgyjq58DxUYQ8QceJCZZFT0/PuOXJhC98zTAMiOKIufm5cj7viTPHD3PwyNHGl7/w+Q/c/eXP/ZYOPX3tmq4qa4Z7KGQUEvIi6FwxwbJIkiRXYb7wQggMkjSi6Wd6ZmZm40ZWzXkBDzz0yOab//ZTv77trlv/1/rM2MhFfV1kawbJ5Wl52kTQ+WKCZVEul2ezqHqyNd9ag8qYGS4ykiz2ZibOMjvfdHfcccdPf/0zn/rYoR/c+08GE5Wv6unCugfIvaflPc/HOaPIi4Sg48QEyyJOYh9ZOlfknkUGcRIzMXm0b2pqqlbvrozTdujoscZXb/rS++768ud+s7Vv50+urZftmqFuChmFBN7zQgSUk4TZibHVc/NNK2WpCDpGTLAssjQhcdlkqznLAjNwzhFnJB6xfdeTw1/41H/7yEO3fe3XqtMn1m3o7aK0dpDce1qeNvGSGItE0GligmVhMWRxZSpvToFYFCcRraKV/P7HfuMvm/sff2ev5rqv6O3GdQ2Se0+r8LxsYpERdJqYYNmkcWmqNV+AAQYuchTMdxU77vuFazYO0lQN74X3nuDC4wiWTZpUR5uzLRYYhhmUqym1Wo1chvciuHDFBK9Kqyi4++573vD1v/30R++6+xu/9K43XIYEGLjIkEEz9xjBhS4meEVGJyaz//7Vr7znm5/7m9+efvLRt26ql6LhKGJ2tsAMEJgZcTkiNxEEMcHLsuvp3QM3ffZv/+nWb3z515PRQ5eu7alTXdNPZA4/eYS85ZHADMwgThzmCAJigh+q8OK799571S2f+fRHn/zO7b/YW8z2XdbXTTwySMt7Wl6YE2VzzE20eJYZUWLMtgqM4EIXE7ygyZnZ5Btf+9q7bv3cp39nbPtD7xypxPHVfV3I1Si8aHnPGQRF7kECM8wgrSbMRSARXOBignPs3rd/1c2f++yHvve1m/65Hdt35bqeGhvXrCYX5BJ4cTYZlCxibrIFGAvMjCgyRBBATLDIA1vvf2DLzX/zyY/u+PZtv9yTT62+uLebdM0AuRdNL34YZ9BqeSThcJhBlDpmVWAEF7qYC9zkzGxy261///Zv/N2NHzux7YF3D2eWXt3bhVyFwouWFy+FBFkUMTmZIwkMMIhTR5I6JLEcRJsZGEGHiblA7T90uOeWL37+F+758ud/S4d3X7Ouu8q64T4KQS6BFy+PiMzImx7vaRNmRhQ5mt4jAcarZgby3kkyQAQdI+YC88BDD1/8pRv/+qPbv33bh+uz40MX9XWRrR0kLzwtL14pCdLI0Zou8BKizSAtReQReC+IeFUkUU4TZo6NrZqcnKqWs2ySoGPEXABm5pvu9m996y1f/+ynPnb04ft+fjBR+aqeLqynn9yLVuF5tQQkkcM3c+SFAQZEsSNOHMvFzJD3zkuOoKPEdKCjh483/vyv/9Pv79qz7fXXbrnuK7/+Kx/9q66e+jxnOXzsWP2rN9/0vju+8JnfKQ4+9Ya1jTJXD3ZTYBQSeLGcnBl+rqDIPWBgRhw75nyBlwAjuHDFdJjpiTn3F1/+v/7j2ObvfGTw4oy7tv7Fz975u1/+jfe++Vc+/sEP/NIX641q6+HHtm266TM3/uoj//D1X6lOn1y3qbebbM0AuTwt0SaWmxBJ7NCcJ295hDCDKDbicoQvhMMILlwxHeazX/r0Lx/vvfcjV73xYqbH5hlat4qj+0evuunbH//MN7/3xd+KJrqfnPzBvf/LRXVXv6q7gXUNkntPy3t+1JwZvhAYGGDOiMsRxAYFwQUupsPsP/z0ltq1GXmzIC3FxKljTWkVq0e6ObTn5HWP3LnzupneFsdmytSaUCmDzCgkfpQkyLKI9Lg4+NQk9f4yhRcHt4+THfPEfQ5PcCGL6TBv/+mfu/nT3/3er1Rqk8M9fVVcZGSVmCSLWF/uZ3BtL0fePsXjdx/m2/efZNXhiHVZhb56CYuNXB6JHwk5eGNPH0c+cYgffP0kviWifU1+sqcPOUAEF7CYDvOmN7/lvr/4s747v37rPR+6/IMXcenr+6nWE1xklKoJaRaRVWOG1tU5+a4Zdj86yqP3j8JTkwy3UkbqVWqVBG8i92I5SRAlxhpfptjtMTOiUpkCIRFc4GI6yMGjxxr/4V//zifXH3n8fVcka3jwLw7xzduPcul7R9h8VR9ZOSZKHOXUUarGVBoJg2vrTL95iEO7J9j94An2/GCcxhFYm5QZaJSJU0ch4b0Qr54EhQlSQ0COCIIFMR1idHI6/i//x+/+1dDBR9/XO9BHM/e8tT7EoUMzPPzHe9h19RGu+McjrL+khyRxuMiIyjFJSWTVmEZvxsbLehn72Vn2bh9j130neHz7cbonHcPVMr3VjFIpBoPcCy8RBMsppgPMzDf5v/+33/z0yMHHfqF39WqahSd2RiExuLrCQF5mz7ZJHn10F0/8VJ1L3jbAyIYuytUYFxlxGhGnEVklplxPWD1U5bKf6OfYwWn2PDrK9m3jzO2ZonocVruUgWqZrmpKnDi8oJBHIghelZgO8Jd/9qf/orLzvl8aXDvMfOGJnOFkOIlCwkewcaiLtc0au747zgPf3sH9l2RsuK6fi69ZRc/qMnHscJGRVWLSckSpntC9qsymy3uZny0YPzHLwacmOPT4OFt3TKKDY3TPOQbTEqtqJSqlBBcZMvASXkIiCF6ymPPctp27hh/58t/8wTvXDdL0wplhZkjCCZwMb6KQiBLHlpEeLm51cXDfNDv+6yG+0XeAvp/o5pI3D7Dmoi4qlRiLjDh1kNIWUaom1HtShjY0yK8bYmayxfFD0xx4YoK928Z4/MkxoqOeWu7ocgldWUKjlFLJYuLYgQMv8BKSEEFwrpjz3M03/vVHLin5QW8RZsIAIYSBGSbhZDgJb8JLkDjWDjZYP9BgfLLJrtvGuf+2x7l/S4kNb+nn4mtX0d1XJo4NFzksgiSJSAD5mHItpbu/zKbL+5h/d87UeJOTx2Y4eWCGk/um2bVvhrnD49hoQWnOaBDRlaR0lVJqpYQ0ceAMZ+ABCYQQIAES4lUTQUeJOY+dGJ9In/7uXR94e18PhRcLDDAMOUBgBhKYwGFIwgu8hEfU6ymva6zmtS3PgT3T7Pjzg3xj1X4aVzcYubKHkc0NevsrZOUYFxkuMuLUEZsDQakaU+/NGFhfQ9eIIhfN+YKZqRYTJ+c4eXiGE/umObRvhl0HZyiOtUhOiqwwUm+Uo5iKiygnMaU4IksiktgRxw7nDOdAgHiOxBmEOMUswopWeWxsrDG4etUEQceIOY89vm3blnTq+BY3MELhPYaBschoMzAMAWYskgxJeAxJeIGXiBLH+sE6GwbqjE/N8/RdUxz41l621T3pphIDV3Sz9vJuBtbVqXWlxInDOcNFhosdZiySRFkJjb6M/jVV/BW9+Fy0mgVzMzmTY/NMjs4zPdZkenye2ZMtjo/OMz/aojkxTzFRYLMemxNpbqSFUXaOxBxiSclFOGORM0cpdiwyI3NGMd8qzc7Olgk6Ssx5bPeunVtqDpd7j5dwBsgwA+M5ZrQZos1AMhxCMgRIwkt4CS+o1zOubpR4rRczsy2OPDXL/odPcl90mHwwovs1dUau6mHNJV30rCqTpI4ocrjIMGe4yLDIIDVOkRf1HtE3VEECeSEJX4iiEHnLkzc983M5s9MtZqdazIw1mRpvMjvepJj3yAsVYnQ6p2gJeeFzTzFdIA+SKJoFx47kinEi6Cgx57GZ6akeh2h5IQkMzMBhYGC0mWEsMZ5hIBmYECAZXkKAJLyEBN5BtZqyqZpyEV20mp6x6TkO3DnD/tv28FjNU76kwuAV3dSHyvQOVWj0ZlSqCWkWEcUOFxnmDBcZLjJiM54jJBZJIAl5kIS8kEBeSCySF5IQbQLvhSS8B3khL1wKf/tvHqQ1XxB0lpjzWLlaGx2fz5FE4YUcRCxxtJlhEphhtBmLDJDRZiCQgcOQhGQIIYEQEngJL4hTx6q0wureCq8txMxsi+O75jixbZyD/hhPVUXRE5EMpjTWVehZW6VnqExXX5lqPSHNIqLIYc4wB2bgnGHOcA4whxmLDBDnkniOWCQEYlFSdpSqCfIi6Cwx57H1GzftunF8hp7j4ww2KlSSmFwQGeAMA5zxLBOYGQYYbQYYIBBtBhIIQ7RJCJCEBB6QhJfwkVGtplSrKesBedFqeWamWow90mT0gWlOMMbTSUHe7ciGM6ojJRrDZap9GeV6QrWekpVjslJMkjni2OEih4sMZ2DOMAPMMNqMRWa0GRgYYGacEseGGUEHijmPjaxdu3+wv/94JXardh2boLeSMdSoYM4hLyIzcIYT4MAwQAjDDIxnGBgLHBhtQrTJECAJAQIkIYEkPEICL5AJFxlpKaKnu8RGDBUizz2z8znjO5qMPjzHaDHBUStoplBkUJSNqBETd8WUehIqvRnl7oRaT0a5kVKpJyRphIsMFxnOGS4ynDOcM8wZUWSAYQ5aLUfe8pgRdJiY89jgwMAxq3Xvr8bTqzb01Tk6OcvjR8cYblTpq2QUCO8hMnDewIRhmAmTgdFmmIFxOkO0GSCQGSAESIYQkiHaJARIIIQEEniEDFwUkWSORiNjHSAJFVB4TzP3tFoFM4dyZvcWzBQtZvI5ps1zjIJmInzZKGKYzQsqXQlR5JgvCix1VGoJOJgrCrJaQlqKsBj2bRsjTiOCzhJzHquWMnUNrtk5te/hq2v1hOFGhdm84PDkDCdm5ljbXaWaJOTyODMiZzjAYXgTToaZQAbGs8wM4xnGIskAgYEwEAghjAUSCIFAgCQESCAJAV4CDDmIMJIsAiV0s8QA0SbhPXgvmq2CwosiEpoUC+bzgrwQIDww18zBGeY8vvA8drBAEUGHiTnPrV6z9snpJ7dSx8i9yKKIjb01xmZa7Do2QaOcMlArU01jCi+8QWTgDDAwDGcCDONMxjMMzGgzEEsMhLFESLQZAiTahGgTCCGBAIk2IdoEAoSQWCSBEC4CJJLUcYpoE5jxLAGGAUJAanDfsTEKiaCzxJznRjZd/NjWW1sMm+ElJJF76CqnNMoJx6fn2HV8nHIS018v011K8YAXRAbO0WYYwjDMAAkz4xTjFMOMM4gFBkabWCDRZoglklgglkhigVgisUgIBAIkFgmxSCDOJRYIZCxIHDgzJIIOE3Oe27B58xPf9oaZOJ2XWDBQL9NfKzM+12T/2BQHzVhdK7OqkuEiR+GFzOEMzMDRZgYSApwZAozTGBhLjNMZiwzEMwSYIcQpknGKeI4kThFLJHE68TzEIgGpM5wzgs4Tc55bs2bdvjwtj8n7bjDOVnhhQE85o6+SMd3MOTEzz5HJWXrLGf31MuXEKARIODOcCTPDzEDCMBaYCTCej2FgPMt4hrFExrNMiHNJxiligQDjFNEmXlTiDGdG0HliznNDw0NHXL17X6s1121xggDjTAK8hBeUk5gNPSnNvODEzBzbj45RS2NWVUs0SikuMrwACTMhM5zADAzDEMYCAwPjXMaZjDbHEoEwDDBAnMY4iyHOIk4jTicgdoYz2kTQWWLOc/VyyTcG1+ycPbjtykqc8BwBxgIDJDADSeTeEzljuKuC9zA212T/+DR+bIpqmtBTzugqJ2RRhEd4CTPDGTgDwzCEscBYZAKBYcjAWGKczsDAAGOJ8TIZpzHOFjvDMETQaWI6wMC6jTumnn6QWq2Gl1ggwACxxDhX7oUBvZWMVdUSraJgcj7n6PQsByamyeKInnJGTzmllMQIkXswEw7DDMzAAAMMQyZMtBkYzzKeYzw/o814VczAjKADxXSANZs2b7vv1hbDZniJMwgwziKEYSzxXshEZEZvJWNVtUTuPVPzLcbn5jkyOUMSObpKKb2VEtU0AjMk8PKAYQYOYWaYscgAA8wMRJt4ltFmGK+McTZjgWEEnSmmA2zYvHnHXd4wE4sEGGcRYLwQscR7jzfDgK5SSm8lxcuYbrYYn2vy5PFxMCglMfU0ppolVJKYNIqQgSQkMISZYYAZGG0GxhLDMIRYYgbCMHEG4xnGGcTZhBF0spgOMLJ23f4iq4zK+x4wfhgBRpsA4wV5CXkWVZOERilhwVyrYLZVMN3MOTE7jy9E5BzlNKKaJtTThHIakTiHmSEJT5tYZIAZGEvMAIHRZmAsMUDGEhmnGM9PgBdIBB0opgMMDQ0dsVr3/lZrtsfihFdDgHEuIfICzCCNHKU4pq+asaCQmG8VzLRyJueaHJ+exQsS56gkMbUsppzEpHFE7IzYOZDAWCSxRAKjzTDADBDPEMYC41nGs4wlXgQdKqYD1Msl3xgc2Tl78LErK3GCAGOBAGOBAAMEmADjWQKMFyPAOEWAl/AFYGBAKY6oJDGuCjIj92K+lTPdzDkxM0/uZ8m9cAYOI4kcSRSRxY4sjsjiiDRypJEjco7IjLN5wBALRJtYIp5VGHgJI+g0MR1iYP3GHVNPP0itZniJsxkgwHhpBBgvnYBCwgswYRiVJKaWJRgGJiTIvScvPM3C0yw8rUJMz8+Te08uscABkXNkscOZsSByRuIcC8yMNHKYgYDUOcwMMyhFDi8BRtBZYjrEmk0Xb7vv71sMm+ElFggwQCwxAcYZBBgvTIDxfAQYL0ZA4QUIMxY5M7I4opTEODMMY4EQCwqJ3HtahWc+Lyi8WOAlZvOCU8ZmC4wlhYTEoggYnW3inBF0lpgOseGizTvu8oaZOIcAo02AcS4BxvMSYCwrAZKQaBOnM4PUOTIXUc8STjHOZBjGEiHEksSMO/ccw3sRdJaYDrFm7dr9RVYZlfc9YCDAeBFCGMYzBBgvSICxMgQIgedFCONckQMhgs7j6BCDQ0NHrNa9v9XK+WHE8xM/nFgigmB5OTpEvVzyjcGRnbPz8ywQL8wA8QxxLokgWGmODjK4ftP2qbkmzoxThDib+J9ABMGLcnSQkU2bt03Mt3DGC5JYIs4gniNeHhEEr56jg2y4aPMTM94w4xwCxDIQP5wIgpfN0UHWrFu3r8gqoyo8i8RzxDPE2cRLIZ6XOIMIglfG0UEGBwePWq17XyvPefnE2cSrI4LgpXN0kHq55BuDIztn5udZIF6YWCDEacTzEi9EBMFycXSY/rXrd07PN3FmnCLOJMAAcS7xPMQrIE4nguDFOTrM8IZNOybnW5jxLEOczgBxGnEuibOJIPjRcXSYDZsv2THjDWc8SywRIEBiiXhFxBKx/ERwoXJ0mDVr1+5rJaVxec8i8SzjxYnniJUgguAUR4cZHh45ZNXu/XmeczaJZ4ggON84OkyjWi66h9Zsn5tvsUC8OCEWiJUnguA5MR3kK1/9yvVf/MaNH3vkkQevfXejTHcjYi4vWCDAOJcBAowFAozTCTB+OAFGELxyMR3iplu++N5bnvj457vfFGebeqvcfscJXneg4DWDPRQmvAQYCwQYSwQYpxFgvAABBgKMIFhWMR1g5/anB2/6wR/915/51U3Z5LGcvv45+kbqPHjbAfY9OcNbhgeolGNahVhggFhiPEOAsUiAcSYBxqskwAiC5xXTAZ58eudFUdfMYJIkVBpGnDjSUkxXb4lHv3uIm+/Zz3XlPjau7qLpPUKYAAMEGM9PAjMWCTCehwAjCF4tRwd421vf9t1Nuv5Pvn/bE7gYSrWYrtUlBjbU+Ynr17H5F9dwe3mUu54+hBUijRzLSpxBBMHL5+gAWTnxv//R/+f3No//wu/d9ZldczMzM2TlmFpPSu9IhUuvXc2bfvkiDl3juOnAPg6cmCY1I3LGKWKJeI44lwiCH42YDlGupvq9f/lv/vj2b/3kPX/1qf/zv2161+QVG7YM4SIjThxJKaLWlbH70lFuv+coq/eO8/qeXga7yhQGhRcCjJdGgAECjOchwAiClyymw7z9nW+9b8ull/30H/1/N/zR95/e+s+vfedGStWEKHGUqgn1vox1l3Sz65ET3Pq9EwzscVzb3cNgd5Ucj5cA43QCjFdCCMN4GQQYwQXI0YGG1w5M/OG/+8RH3pj91ofv/OTuk6Mnx8kqMZVGQs9AhaFNDV73thHe9Gub4ee7+Ko7ym17DjIx1aTkIiIzxPITQfDCYjqUi+Gf/eqvfeaq71973//7d//uL7vf8NRbtrx+LWk5IUqNrBJTaaT09pfZdHkvOx88zi1bD7NuT8q1vb2s7ipTIHIvziTACILlFt1www10suGRwZNvfd3Pf/axO47N3nPH96+2ymyld7BOksbEmSOrxFQbCf1r6/RsrnO41GTrvuPs3zdBmhvdpYxyGiHAC8zAMBaYscgwMBYZS4w2o80wnmPGGQzjbGa8JMa5IjO2HjyZX//+D39ieHDgJEHHiG644QY6XamcFdf99Fvvvnbd9Z/c+vd7kq33Pnh52l1kPf01kiQiKUVklZhaI2NwXY1Vl3Ux3gcPjY3y8N4TjJ2co2oxXeWUNHZIIMCMRYaxyMBYYrQZbYbxHDPOYCwwTmfGS2KcKzJj68GT+fXv//AnhgcHThJ0jOiGG27gx0Xvqp7p69/27lsv7X3zZ7/z1R2Nhx96+DWVVcQ9q2rESURajihVExq9JUY2NVh/dS/VLVUOZE3uP3yc7XtHaU7lNNKUeikhcoaXAGORgbHEaDPaDOM5ZpzBWGCczoyXxDhXZMbWgyfz69//4U8MDw6cJOgY0Q033MCPm4Gh/rGfe8d7vzKSXPulu295dPW27Y9d1hiMrdFbIYqNtByRVWLK9YTe/grrLu1mzdW9sCHjiXyK+/cdZ8/BCVwLurOUchoTRw7MQGKB0Wa0GcZzzDiDscA4nRkviXGuyIytB0/m17//w58YHhw4SdAxYn5cGfzUm9/w+E++8dMfvP0f7nzDF/7uv/zbx0Ye/8dX/Mwgvf0N4iwiSh1ZJabSlVLvLbF6pMZlr+vnxOEZdj9+kjseHOWu/cfpbyWMZBWGa2UG6mUqpQQcFBKFFy9GgBEEEPNjzsXGO3/2bfdd95Y3v/db/3Db2+++9ZbffoSH3z10RVpZd+kqao0KUeJIMke5HlPtSWmsKjG8scH0m4c5eWyGI3uneOKpSbbuPobtz+lrxqwtVVjfqNLfqFDJEsxB7oWXRywPAUbw4yLmApGVE/7Rz7/n9p9793tuf3zb9nW3/Y+vfGDrvXd9KBk5cM26q7oY3NBLlqVEsSMrx1QaCfVVGavWVNn0ml6acwUzk01Gj81yZO8Uu56a5MHdx3B7C3qbMetKFdY1qvTXS2RJRBJH4FjkBV5CEl4EF6iYC4yL4fKrtuy9/Kot/3F64l/+yb3f+x8/cdc9X//QPbc/+L7ui1vD66/so6+/QVqKSLIICeRFUYiuVpnVa2tsvLyX5lzBzGSL0aMzHNk7xc6nJnlg91HiI55Sy6gVEd1RQk+S0lvK6MpS6qWELIlIkgjnQEAhIbFIEgsECLHARPBjIuYCVm2U8ndc/47vvOP6d3zn4N4jf3Dnd257971f+MavPtJ46m3DV2aloY091Bpl4iQmSoDMIcXIi6IQ3S3P6rU1Nl3Rx/xszsxki+mJJlPjTSZG55g4Ps+h43PMnRwjHytwRwuyeaPmI7qjlN4kpa+UkcUO54xSHLMgiRxZ7MAgNsNFjgWRM0qRIzIj6DwxwaLhdQMTH1r3y5//YOvDn3/k4UcvuuP7X3v/g3d9773Nyu4rasNFffCiOqvXNKg1KsSpIwZUiigJ5EWRiyL3FLnH56LIPUUu8mZBa75gbjZnZqrF1Pg8EyfnmTg+x8Hj88yPztKcynFA6o256ZzYGVEL5ucKammCy0Xe8tTTBGsW7BqdJIkcQWeJCc4QJcbVr7vyyatfd+XHm7P5x5966unhBx7+/k9tu+v+t9w79cSbfP3Aa3o2usrAxhqrhhtUG2XiNCJOQIoAIYEE8kJeeC+KXPhCFLmnyEXR8uStgta8pyg8vhB57vGFp8hFnnt87slbojmfU+Qib3nyoiC9sYWanqCzxAQvKC3HbLn84oNbLr/4S/DhL81ONd2Tu55c++gTP3j9499+4Lr7pne8Ka8dvLyxlsrQRQ16B+qUyglxGhPHDnCAQCCWSCAvJPCF8F4gIYEEkkAgCXlAQgJJyIs4c+y68wRFLoLOEhO8ZOVa6q+4+rI9V1x92R74pS/NTrVs584n1j/4yPfftP3WB9+yfeqp1xXZ5EhUa64u9xBX+2K6+8vUesrUukpk5YQkSYgSBwaIRaJNPA8h2sSzkpIjLUVIIugsMcErVq4luuqay3dfdc3lu+GffWZuqmUnTpyoHzl6ZHD/ob3r9x/avfnI4/s2H5o5vGm6OL7Bl6YH43pzdbnXolpfQnd/mUojI44josSRpBEucphBHEeYczhnuNiBwMyIYsMcSDKCjhITLJtSLdFIbXBiZP3gxLW89gngNtrkYXZq3o4dP9597NiRgb0H9mw8sG/PRUcf3n/JvpnD66ZnprobfVkxOn5ydV40S7W+jMnJye6sErm0avHk1GSj2pUpTjHiwo7vnWqWK1mToKPEBD9y5qDSyLS+MTK6ftPI6Ou5djvPUAG+AAnmZueioihMyEZPnuzykrWazXR0bKwnzeJiYmK8ceLEib4P/kHv6GVXXLqXoKPEBP9TWQRRxKJaVip4Rndf7TjPOUDQ8RxBEKwIRxAEK8IRBMGKcARBsCIcQRCsCEcQBCvCEQTBinAEQbAiHEEQrAhHEAQrwhEEwYpwBEGwIv5/4544/pGjsycAAAAASUVORK5CYII="
  },
  {
    "width": 110,
    "height": 83,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 55,
    "height": 42,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAARISURBVO3BW4iUZRjA8f/zvu83O7uzs+thcdvWzqKFXWh6IxKxtlBWrAYSSkFoGUJ5I0SBpF5IF3ZVQaBQRiLdJEgSHhKzCynTckFL8wDZpuMemt3Z0xy++d6ndUtR6GLMbXaj+f2oqKioqKioqKj4z2tpaXmVCcAwxtrb22uiYq6NCcAyxjo4tuHhZ+Mr596/6NTxb9pP85fVTy5aM2PalIU/dqSOUiaOMWa9HbrroUkcPfLbHV/s3Td5z5aN65NSfCYo/D6zgOygjBxjrN7d2al4alI9Kw5veXNTg6FBRACD9WGcMjKMoVWLH19VferiS+qFWikujFtpEBHGi+M2HT3+fWL7G2vXJzW/JMj1PBiKN76oUG1gkHHl+IfWrVn9SOHMD+s+e/3l1gajjWIEMHhVotBjEga6uYmod5SR4xZsPrjk24F0js6tqcHYz8cWJJzUMEq4xhpDsRCBE0C5keAdZeQo0VurX5iT3//L9GRrXfPUzffSc6KP/q8zJLrAWsM1xgjD76SoiwARxpOjRI3pjq3VGdM89EEv3bOg9tF67t44jYGePP1nB8ieHMSfzhHPG+LOosK4c5Tg4+0fzczu+XBezAbEaqpIXlQKFwbptmmK8+PUzk7QvKCBqoRjuD9ksCdHMRMS9oaEfSE+76GgFC5pwFHKxlGCmmTd0MWhnLfG2JrAUe0M1YElqQHRCSU8PsRAvo+upMfPjCHNMYIpAfH7EsRqHSYwGCe4s/3CNsrGUYLnli27tPnpBT3p4XzToA2ZXB2jOuaIWYs4EIT6eAyvSnRW8Wc8XvN4zVGMPJFXIlUkM0w5OUrkVTsDa5qsgXS2QJAPqQosdVUxYtZgjeDEYES4kTJClatykaecHCUKiz6FNXNUIWYFawyq0DOUwxrBGUNgDTUxR5U1iAhGBMMIEa4yYignR4mGCC5MJkK5WdxZjBFEGNWfLRCpYkQwAiKCAAL0ZvOUk6NE/fHak1GUxlmLMkIBAQUUEECAmLOIgCCIcJ0AzhrKyVCi1hUr9xYiLSojFBTlOgUUlInFUKLlK5Z3qA26GaEof0+5kTK+DCXa/fnuqYUo6kcZpYAysRlK9F209V2/pn5WV7LAKFVQUCYuQ4mm/vrY+qpE/MvJrzX7joWWjBa5RgHlT8oNlHFlKdGBfQczX+04u2Ne6wzbOLf+AVmYqLtClvBynoS3GCOIgIggAsJVggijBOjLhecPnbu0kzKx3KIju84d3vTiJ9tOdR2ub5o3qTHeUj+p8x7ImJCh3gI2C3FrQRghiDBKgL5ceP7QuUs7KRPhNgxmhmXDp8+/Mn2+WVZVY2eL9XcUsl76U1m0u4B0FbHpCPKKySmpK9l97+06sZgyEcbI8ECeje+vfSI++3LbpKbYjHitm2adaRBD0nuNgw86fsrsf3vpgacoE+FfNtCbpbOrs+pKZ6o+ne62bUvbUlRU/H/9ATmnqmQNIxPZAAAAAElFTkSuQmCC"
  },
  {
    "width": 28,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAGsSURBVO3BO2hTURzA4d955CZSiW2zZFJBUPEFVUSbLkakDoKOThHFpXV0ELo4CcVNBQcnwYpuCi2IYoPiJN10EB9RpCg+QFISb2/iPff8zVyuWC6tIPT7WLNm1VSr1YOsAM0ybRr9dWH8/Jld9NQOVY6TkWWZto4MlD9ffjkxcXhoOPZhF5gmA8tfjB0ZOVpMovFuY3HnOuWGrdY4z1sysqS4NHvi3Le5H1v6ZsOKkXCvNiqQlkP1aejQI5qMLCnW326eNpX8/s7ZPH6+S3fuJ3amRZ4epehRZGRZYmrqVrl978a+0hNNRxKiHTnkZJnFAJzygILIaZ6SiWWJWu3U18ljBxac94PFQo7+dxrz3iECXgTnhbAbk5UlhYLvggxGcULHeXJGExiN0QqjFNZostKk8CJfREAAoxQK8AKJh9gLsfdkpUkRoz8Jq0OTwo31l9qVnMTeI6wsQ4pndxt3Ri8OFTq7g41JiQ1x0xFEYLRCKYXzfmHm1fxVMjD8Qf3mm/r09RdXnvsHzUK1mDT35CTcZnW03Zr2Zt2q3/9wjX+h8fqjefTw8QD/i98ZK6VdMo/eSQAAAABJRU5ErkJggg=="
  },
  {
    "width": 14,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAAC3SURBVM3BvQ7BUBgG4LdHNR0qTWyGrgYLiYVBoouRxd8tSCQmFyBxA2YbN2EQ19Dd0kg6CREp2uo5n+VMQrsYPA/+g23bFlIwfFDtYzZtVtZIoEKabzu1y8praR5v0+FRBqMrEqiQzOVpkisZw1uRI2IEbhsKdvhKheT7kTAdAUvXkGUMTyEUJFAhxQL7mAhhzEEZQBAhCYMUjfLuvaG7YUEBgZBGwZuF0x0Hx6DOzrE2HWx6+LUXE68+IhM+39IAAAAASUVORK5CYII="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;