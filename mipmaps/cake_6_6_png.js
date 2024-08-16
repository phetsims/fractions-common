/* eslint-disable */
import MipmapElement from '../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 219, 166, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAACmCAYAAABTP/pfAAAAAklEQVR4AewaftIAACBfSURBVO3BCZyeZXno4f/9vNu3zr5lmUz2sMkii1KoVgUMglVxOWpBcQGXFk/Vanvankqr/bV2VVs81bba1kprQVH2RSqIFhcMi4SQELIns2W2b+ab+Zb3fe4zk2ACNVDU5J1M5rkuUVUcxznyDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI7jpMLgOE4qDI4zC1SV+cbgOCnr7x9ouXDt2m/88Sc+8VvMIwbHSdl99337l+751p2/+u///uX3lsvlkHnC4Dgp6+3ds6i1pZHu7sWDmUymxjxhcJyU7dnTuziOY5qaW/o8z2O+MDhOiuKaZeuWLct936Oh0DTAPGJwnJTs2d3X8vYPvuau7zxw51sLUQvfW3/3675641cuYZ4wOE5KvnbDdZdsGfvheadeuIim4w0rX55p/9svf+Iv+nv3FpkHfBwnJb0Du3sWr2rh1JcsxQuEqckqW+u2ls1kK8wDPo6TkrHx4Y7isgxNnVlyDSEje0sUokxvNputMw8YHCclw6XBhdlihFqI65byWIWMaegPMob5wOA4KbAxTNbGWzP5ADHsU5mq05ht28M8YXCcFJTGSlElHm/NZANEhBmTYzU6WhfuYJ4wOE4KSqVSsZJMtETZEDHCjFrZ0phv7WWeMDhOCkZGRholiAtB5CGGaUplwtLe0tnHPGFwnBQM7h3sMFGS8X0PEUFVqZdJmptaB5knDI6TguHhoTY/C15gEIE4TjBxZqS1pW2QI2DPrr7mBx94eGVlsupzlPBxnBQMDg90ZgoexggIJPUEquFoc1PzGIfZXd+846V/+aX/86+am1h8evfaa/7gN//iqkwuVGaZwXFSMLi3f0Gm4CNGEIRaLSaS4kA2l61xGH3//h+84A/+9n03LnlxsPj0tT08kdz565/9+09fxVHA4DgpGJsYbs8WQ4wnzKiUqxQzrbuinM/htGHTY8dN1koNtRKUh+v0rOnke5tueefo0HjALPNx5pwHH3roxF07d3YjJmaWiTE6VS5nh/cOdBpjlEMw4lcf3fDQWceflEdEQEATw7aNOzu/8Pl/fEui9SyHQRiGtY0bNq2ojHhMjFbJFAKyxQy2tfeU2+68+cK3vOUtNzKLfJw5ZaxUyr/h4ou/0VIZXrFmYTtxkqDKrIt8g/DTBKhXEwbzdc5oOg0xggjUqoax9Y+89L51f/hSazhMlNAEFGvC8MAUhaaIajFg8XHNfO3uL374/FesvbOto7nCLPFx5pR6HPumNlUYLk1Rbk84fekCPIHYKrPJqnIoRoSJiRpP+iMEocEY9imPVWn2Mqxa3ExdLYdL6Bkmeg3rd5XpWlIgrlsam/JMZLa85LLX/+pt//r1b7y6tbVlgllgcOYcERQL6zbv5qYHNzE4UUFEqCeWemKpJ5Z6YqknlnpiqSeWemKpJ5Z6YqknlnpiqSeWemKpJ5Z6YqknlnpiqSeWemKpJ5Z6YqknlnpiqSeWemKpJ5Z6YqknlnpiqSeWxCqJVRKrJFZJrJJYxVplshZj8h5h5CEizJgaq+PHkKiSWCWxSmKVxCqJVRKrJFZJrJJYJbFKYpXEKolVEqskVkmsklglsUpilWps6SnmkcGYSiXBxpakbula2UZ11/pfufp977huaHQswywwOHOSCEQ+DAyVuOXBjWzqHyH0PYwIRxMRqMYWP+/hhwYxoMDkSJVIDMrhZVXJhj652DBVrpPUFWuVqOBTaG+k9OMfrP3Hz/7NrzMLDM6cFviQ1Op8e/2T3LdpJ4lC4BmOFiLCVBwTNQT4vkFEsFapjcVEGBTlcPOMEFqhUq6TxBa1Sq4YMukr3W1t/NeN1723f+9QnpQZnDnPGAgNPL6jn1sf2sjecoXQ9zgaCDCVJEQNAZ5vQMAmSnWkRtb3UOXwEwjVUK9ZRAARoqyHNHiI8cmN7135ja9e9wZSZnCOGZEPI2Nlbl33OOv37CXwPDwRZpXClCZkiwFiBBGIE0t9LCbwPBTlSPBVMEbwIw/jCb5vSEKo1hOWtDbyn9df+55ypSqkyOAcU3wPNEn4rw3buGfjdqqJJfAMs6mKJdcYYAzThFolwY4nBL5BlcNOFaY8S74pxPMNnifEdYtMWqLQI5vNEu/ecvZdt992HikyOMccIxB58OSuQW55cCO9pUki30NIn7VKzSiZQoAYAYFaJYayxfcMh5sA1XrCuJeQK4Z4vuD5hqnJGH9cyYQ+VmFRMcMt//6lK0mRwTlmhT6MT0xxx0ObeGjnAJ5n8IyQpiRR6r6SLQQYI4hApRzjVxVjhMPNGGG8UqOeg0JDSJDx8EPDxEiVfM3g+wYjQkMhz8Cmx166beeudlJicI5pvgfGJvxg4w7uWr+VqXpC6HmkQQCrSlUtQcEnzPsEWZ/JyTpSUYwnHG6+CH3lCsUlORrbMkQ5Hy8wTAxWaPYCEDAi+J5Ppj7VvmPr1mWkxOAc80Qg8mFn3zA3r9vIjpFxQt9DOLIU8ALD6VET276yh633D7L5uwPs/no/C/0MFuVwEoGpSswWf4qlp7SQyQcEkYcFSjunaApCFAUBY4SQhB3btiwnJT7OvBH6MDVV4a6Hn+DkZQs5bUknBiWxypFiVeluLtCxM6b8mT5UYJnnERazJKocTqHxeGBohMypedq68mTyPn5gGBqcQh+for2xHatgAAsUQp8927YeR0oMzrziGfCxPLR5F3f++EnGqzGh73EkxdbiR4amQkRzPsLPeCSqHE6eEUoTVbZlKiw7uYVsMSDIeJjQsOX+QZZVs3i+QQARYUYm8OnfsXUVKTE4844IRD7sGRzllnWPs2XvGKHvYUQ4UhSwKBZFObxEwFh4YHiYBee00rWkSK4hIIgMQwOTVL4/ztLWAokqIoIwQ8iEISO9u1dU44Q0GJx5K/ShVq3xn49s5r8278YCvjHMNQGGB3qH0BfnOOHFnRSaQ8KMh/ENG+7uZXktgxd6iIAREBFEwPN9RvYOLhoeHm4gBQZnXvMMhEZZv62X2x9+gpGpKqHvMVdExvDQniGGTvI45eWLKTZHRFkf4xt2by9R/2GZ5e0NJNZiEGaIgDBDCXwv8X0/IQUGx5kW+TA4PM4t6x7n8b5hQt/DiHC0EiDjeTy6Z4TdK5XTXrmYprYMmbyP8Q2lUo1N1+/mzEwTEhhEBBEQEWaICEmS0NDa1tvY2FgmBQbHeUrgg41j7lu/hW9v2kGsSuAZjjZGBB/hoV1DbFuacMZre2hbkCdbDPADQ7We8ND121mzK6S9KYeqYkQQAeGgWq1OS9eiLaFnSIOP4zyNEYg82LhjgMGxMuce10NXMUctTlBmX+AZpibrfH9oCDm7wLmvXExTW4Yo52M8IU6UdTfuYOEjytKuIrFajAj7CYiCsk8tTuhs69hJSnwc5xAiH8ZKZW57cCOnr1jMiQvbUWtJVJktkeexe2iCdVqi+42dHH9WJ7liQJj1EBESqzx8924K905xQlcrCeAZQRBmKIoq+6jCZD2me/mKTaTEx3Gehe+BTRK+t2E7A2Nlzl65mGzgUU8saQqMQWPlwT172bXYcsoly+he2UgmH+BHBhRqNctj3+1Dbx7j1PYWrAEDGBEOUGEfVRSljqF94eIdpMTHcZ6DEYh82LJnL3vHy5yzuofu5gK1OEE5snwjiIXtA+Ns0jK5lzbyyy9fQGtHjijv4/kCKoxPVLn/+m0UvjvFi7rawQNBMMI0AQFUUQEUFLDWMlzX2oJFi3eQEh/HeR4iH8oTU9z58CZOW76Ik7s7QJXEKoebJ4KH0Dc8yfpKCU7KcsIrltG9solMzifIeBgDaoXe3SW+/4UnWbrF4wWL2lEDRgQjwgwBFFCmKaCKopQrVYYIe7u7u3eTEh/HeZ58D1QtP9y0k77RCc5dvYRiFFBLEg4HI4IvwvBYhUdKo1RXh6x6xRKWn9hCrhgQZDyMJ6iCqvL4gwNs+MJ2zqg30L2kSKKKJyAiGBEOUlQFxWIBQdg5XKJjyXEb21qay6TEx3F+BiKQ8WH3wAg3lyc5e3UPS1sbqCcJqvzMBPCMQawyNl5jQ6nE0EJlxSULWXVqG8XmiDDj4QUGFGyiVCox6+7cxehXBzmvuZ1iS4hVxTOCEUGYJhygyjRFFaxVqnFC/9gEL3rlSY+QIh/H+TmEPlSmqtz9yBOc1LOAF/YswDcQW8vzYUTwRahWE3aVSuy0FepLfLoubueFp7XR1JYlzPr4oUEEbKLUawm7tpZ47JbdNK+rc0HXAkwgqIJnBCOCIIiwn4JFQcEqWFUUGJqsUE0sq0448WFS5OM4PyfPgFHlkS172Dte5pdWLaE5F1GLEw5FAN8YsMpQqcKOyUmGmyzZs/KsOLOHRSsaKTREBJHBCwzGCNYqSawM9Jb58Z27Kd83xgsosLS7GYtiRDAiGBFEeAYVQEEBRUmsUk8so5NVomyWVccd/xgp8nGcX4AIRD70DY5x8/jjnL26h5UdzcRJglXlJzwjxHXLtpFxtidTxEsDFpzRxtknN9PWmSfK+nihwfMFEUFVsYkyNlLhx/f00n/nXpaPRbyks4sgMlgFTwxGBCMgIgj7KaCq7KOgqiRWUWBPaRJPlGxD88CSnqXbSZGP4xwGgQ9Jrc49j26mv7uLM5YtJDCG2Fo8IwyNV/huaYjG0xs48fzldHUXKTSGBJGHHxiMJyigiZIklqnJmI0/GmTLTXvo2C5c0NFOfklAogoIvhGMgIggAsLTKCigClYVq4oqDE1WmKjVafCEfGvX5gULFgyRIh/HOUyMgRB4bHsfg6UJzl2zlPZihqnJOutsiZOuXIZOJixYVKRjSYF9REAVmyhJbBkbqbL54SF23TdIcWPMSxqaaF2WJUGZEXgGA4gIIiAICPspKIoCClhVrCpWoVyL6RufoiOfYXBklM5Tlq8PjJAmH8c5zCIfhkcnuHXd45y1upvuQgNBe0hTc8Sk1tj+6DALVzcS1xJsbKlWEnp3lNj0vQEG7h+hpV84o6mRhYsLqAEV8MVgRDACgiDCPoIwQ1FUAAuqilXFqpJYpZ5YdoxO0JKN8IxhvFLjjBNOfIiU+TjOEeB7YJOY76zfyuoF7dQqEdVKQiYfMNo/ycRIlUo1ZsuPh3ny3n7qj07SE2d4YWs7LSszWFFm+CIYEUQEIyAIIvw0BVVQQBWsVWJrsarsGJ0gG3hkA4/EWioqrFxz/AZS5uM4R4gRCD14sneQqV6D/62Ik89bxMREnXu+spmhdWPkd1lOyhXp6VpMFHokKAp4IhgRjAhGQEQQpgnTBAEUBQUFFFAUq0qiSqyKVdg5ViZRpTUXUYstSWLRTH501erVG0mZj+McYZ4HRbU8/h9Psun+fpY3NLDKy3NqUwutyzOIJ1hVEAjEICIYARHBACLCDGGaAAoKCIJFUQVVsAqJKolV4sSyfWQCVaU9n6GeWGbU6jUyzW07Fi1e3EvKDI6TAhVo9MHfNsFKyfArqxfR2pxBPMGIEHqGwDP4niEwgm8MvgjGCEYEYwQRQRAQ9lFVFLCqWFUSa7FWqcQJW4ZLBJ7QXshiraIKCpQrVTp7lq/PRaGSMoPjpEUgE8G3H9/Khv5h8lFAYAyBMfjG4BmDbwTPGIwIxghGBCNgABEOUMACVpVEldharMJELWbrcImGKKQpGxFbiwKKIsBEpcayNcc/yiwwOE6KRECscvvDmynXYqLAwzOCbwyeEYwIRsAYQUQQBBCeThVUFWuVxCqJtSgwMlVl+8g47fkM+TAgscoM5aDJWFl1/AkPMwsMjpMy34OhsUm+vXEnmcDHM4IxgieCEUFEEEAAEaYpM1TBqmJVSawSW4tVJbbKztEyfaVJFjbkiHyPRBUFVAFVVEHVUvOC6orVazYyCwzOXCOAxxyXDeBHW3czMD5J6HkYQAABhINUFQWsgkWxqiRWSdSiwPBklY0Do9QSy6KmPEaERBVQUFAUBRSo1evkWju29fT07GQWGJw5paFYHO9cunL9eAyGuUsEJqdifritj8g3iADCPsp+qopVsKpYVaxVYqtYVabqCZv3lugbn6SrIUdXMYsqKNMUUKYpM5T9avUYMvmhYqFQZRYYnDklDILkH770pctbli3dUKqAYe4KPfjxzgHK9QQRAQUFFLCqWAWrSmKV2FoSq1i17C6V2by3RC7w6WkuEHqG2FpUFVVQQAEFVAEFARIxrNv46As2Pr5hObPA4Mw5a1av3v61225f27hs2WOjFTDMTb6BodIEu0Ym8ERQwKpiVUmsEltLbC1WlRmjlRqP948xVUvoaS7QlA1JrGKVZ6WAoswoTcU0HE/xjv+86bXMAoMzJx2/Zs2OG26//cIFJ574wEgFDHOQQD1Wtg+NYUSwqlirJImSWIuqYhWGJ6tsGBhl92iZjkKGhY05ZiRWUZ6iPEV5JkUBAcZqdY47dyEPb/7Oa+KqJW0GZ846bvXqHbfdffcFK844496hChjmHgP0l8rEVomtEquiKLFV+saneKx/hN7xSZoyEUtbi2QCn9gqM5SDFFBAAUVRQBVUAQVrlanA0rW0mXGz+4WbNj3RQ8oMzpzW1dk58rVbbnndqjPPuHdvBQxzixEYm6pQtxZUqcYJO0YmeKx/lLFKjQXFHMtbihSjgMRarCqg7KegTFOeQQEFRVH2q9UT4pyQK4aoXy8Mj+xtI2UGZ87r6ugY+dpNN19y4jm/dOdgBQxzS2KV8WqdzUMlNg6MUreWnuYCS5ryRIEhtopV5QAF5RAUUJ6iqALKPlPVGG3yCEOfsAC9A3sWkTKDc0zo6uwcvvWub1507kUXfaW/Aoa5QQQqsWXr8DihZ1jR2sCChhxGhNgqqvwU5ZkUUFUUUEABZT9FQWC8GhM0B4hCkBVGS0NdpMzgHDPy2Wz8b9ddd+lLL77oK30VMMpRL7GwoKnAqtYGWvMZFIitAspzUvZRnk55OgUUEGA8rpNpDUliS64Y0ju4cykpMzjHlFw2G1/7H9dd9vLXvOba3iqIcnQTaM5FWFUSqzyd8t8oKAcpT1F+iiqoKiiohQmNyTYE2ESJ8j7Dpf5uUmZwjjm5bLZ+3Q03/Nqb3/3uT/VWQZSjlgg0ZCOsKgcoh6TCISmggAKKosozxIml7FnyTSEzwjBgvDLSqTGpMjjHJE+Ev/v833/wLe++4q97qyDK0UfB94RCGKLKs1IFZZoyTZmhKCjTlAMUUKYpiqKAAtVaQj0L2XyAGCGOExqLLYPikyqDc8wSgb/7+89/6K1XXvFXu6uAclRRIAh88lGAVeW5KfsoKIegoIACCqiCqiICE9U6XqNPGHl4RqhXY1oKndtJmcE5pgnwd5/7/Ic/+Pu/9zt9VcBy1LAK2TAg8j2U/ZTnpjyTAqqKcmgClGp1wuYA3zeYwDA1UWdB++KtpMzgzAsf//gnPvnhq6/+rd4aYDkqWIV8JiL0DVaVg5TnQ3k65ekURZmmMFavkW0KMEbwPCGpQktj525SZnDmjY997GN/+ZGrr/6t3TXQBITZZRWKmRBPhOdDeYqC8hTlAEVRQBVUAQWbKJO+pbEjixcYjC/Uy9DVsXAPKTM488offOxjf/mnn/nMOwdjqScxCLNHFRqyGUSE/055JlUOSQEFlKcoKMoMERiv1JGFIa0L8oQZD/GAelRqbmwZJGUGZ9656qqrvvhnn/vc5XsT6kkMwiwRaMiGoMoByqEJ05QZioIyTTlAAeUAVTAIfdUpcsuyFBpCgoxHrVLFjhY3dXd37yFlBmdeuvKKK6798899/vKBmHq9DkL6RKAhG2FVeTaqTFNQQEF5inCQggIKKIoqIFCvWwajmPaeAlHWI8z47Nk2wik9L7ku35BRUmZw5q0rrrji2mu+9KU3TUTZsVoNhBQp+L5QCANUeX6EgxQUUFWUZ1LAAEOTFexCn+a2LGHOxwth7xO2/MpfefXXmAUGZ1677NJLv/6F/7judROZ7FitBkI6FAh9n3wUYlV5Lsp+qhygPJ3yE8o0VURhVzJF87IC2UJAmPEYHyvTnCy/94Wnn7qZWWBw5r2LL7roW1+87vrXTmSyY5UqCEeetZCLQjKBh0WZocxQlJ+mPEVBAWGacoCiKNMURITyVMxEM3R2F8gUAqKcz66NI5xz8oXXisesMDjOtItf9ap7vvS1G16dNLfsmayAcGRZhXwmJPQMqvzMFFBAAWWaAqooiljYkpRpP72J1q4c2UKAmoSJ7eHu81924W3MEoPjPGXtK19531dvv32t6ejYMVkBw5FjgWImwojwP1EOUhSUacoBygGeCP3lKUorPLrXNFNoiohyHoO7R+kpvPDGpSsWDzNLDI7zNC8688wfX3fzzReZjo7t4xUwHBmq0JCNEBEOUA5JlGmK8hThIAUFFBARatWEzfkK3ae10NiWIcr7GB+2fn9i/M2vftc1zCKD4/w3Z5155qPX33LrxfklSzaOVcBwBAg0ZCNQ5dmoMk1RpikHKSigqigHGQvrp0rkTi3QubhAriEkyvtsfmQPZ3a+4RMvOvvM9cwig+McwplnnP7o7ffe+/L249Y8OFoBw+ElBhqyEVaV56Lsp8IBytMpM0Jj2FkqM9wjLD2umUJLRCbvMzE+Qfmxtu+8/10f+mtmmcFxnsXypUv3fP3W2y/qPG7Ng6MVMBweqhB4hkIUYJXnRwFlH2Gaso8CvhGGShXWZ8osP6uNpo4s2UKAnxEeu2dv5W1rP/JbjS35OrPM4DjPYfmypb033Hb7RV0nHP+joQoYfnGqEAY+uTDAqnKQovw05SkCCiiggAKhZxgeq3BvdS9Lzu+ge2UTxZaIbCFg24ZeTshd+OcXrH3F9zkKGBznf7B86dLeu7593ytOOvecO/ZWwPCLUYVsGBD5HooyQ3kWCsJ+qoAyTZkReIahsQp3lfpZ9uoFrDiplYa2DJlCwOTUJAM/yK17z2Uf+iRHCYPjPA/tra1j19940xtfcO65d+ytgOHnZxXymZDQM6jynFRA+QllhgKBZxgaq3DHaB+rLlnE6lPaaGjNEOV9MJZHvtlbfdsFH/3NrkVtZY4SBsd5nlqbm8evv/HGN578kl++rb8Chp+PBYqZCCPCs1FlP2WaouynQOgZhsamuH24l1WvW8Sa09ppaMuSKQZgLI99t7f+upM+etmFr1p7H0cRg+P8DFqbm8dvvPX2157/+tf/c18FDD87VWjMZRARDlAOQdlHOSDjGwZHprh1by8rX7eQNae109CWJVv0EV/Z9IOB2gWLf/PX3nTJW6/jKGNwnJ9RIZ+r/eu//ds7177xDf/UVwHDz0igMRuhqjwXZT8FBIiMYXNfiW/WBlnzpsUc98IOGjqy5BoCvBAeuXc7Lyq8471vfO1bruMoZHCcn0MYBPZfvnztu9a+8Y3/tLsCojxvxkBDNkJVeT4Cz0Cs3LO9jwc6y5z6tmWc+KJOmhfmyDcEeCFsfGAPZ+Yvu+ryt17xRY5S3tVXX43j/Dw8z9PXXnLJjb17B7Pf/d4D5xQ9QHhOquD5HmcsW0QuDLCqPJfI8+gfneSOoT7s2XnOuGgJC5c1UGzNkMn7mBCe+FEvL5A3//p73va/r0E4avk4zi/A9zy95prP/nbg+/E/fuZvfndhBCo8K1WIfI9cFGBVOUj5CQWMETwrrNs5yMP5Mivf0MXKk1ppaMuQLQb4ocFqwobv9SYvMG/60BWXfuCzCEc1H8c5DD716c/8HiL6+U9/5vcWh4DhkKxCLgqJPIOizFD2U0AEIuNRmqhxT38fY2s8zjxvGQt6Gii2RER5Hz8wjI+XeeDmXbXzl77vyndeduU/Mwf4OM5h8qlPffr3GxoaS5/++Mc/2RGCGH6KKuQyIaHnUUsSni7yDLWa5eHBIR6mRPN5zZxzVifNXTkKTSFBxsMLhB1P9PPEHcmmd13w55ef/8rz7meO8HGcw+iP/uiP/qxQKEx84rd/+5rOEMTwDBZoyEaIcEBgDLZueXxwjEeSEpyQ4eSzl7FgSZFCc0S2GBCEHpaEB7+1FTat+con3/8n7+9ZsXiYOcTHcQ6zj370o58VEf7wox+9pssHzwdlP1VoyEaICIExYJWtAyUeqIyQHBex4sWL6F7RRKE5JFsI8EMPPzSMj03wo5t6y2e3v+3D7776/Z8LMx5zjY/jHAEf+chHPhtlMlMf+9AHP9tSTzJ+AMo0gZZ8lgBhx/AEPxwfprzCZ/mLF9KzuoliS4ZsMSDIeHieYHxh28Y+nrydR6+86K/e/tKX/fI65igfxzlCPnDVVV9sbm4e/cDlb7+2pW4zfgC+B1NTMTft3MVAl6V7bSenn9BMY2uGbDEkzHp4vmA8w9jwOA/dvYPm4TP/+c8+8PEPLFrSVWIO83GcI+iySy+9QeCtv3H55de21JKMDQ0/ypdpP7WRl5zfTUNrhlwxIMz5eL7B84Xy+CSPfmcXY480PfDac3736tf/xhtu8UPDXOfjOEfYpZdeeoMX+G+66m3v+JfODr/p3HesojQ4RVxNaFucB1WMb6jV6jzy7R30fz/a+LIT3vknl37i7V8uNOZijhE+jpOCt/yvN9/UWGx81R9//HdviiTbmm+K6XuyxJoXd6DA4w/sYMt9tf4zF73uk//3/1z5ufaulkmOMT6Ok5JXverC+8Mg8+o//H/vu+n48xtaxcAj39lG36O18TW5Cz79p++58jMrVi8d5Bjl4zgpOu/8l91vk7+9+Hf+9L3X12R8wcvOeM0//P6lH/rjk045bgfHOB/HSdkFa8/73rJld7xoaO9Q44vPOesx5gkfx5kFq9as2L1qzYrdzCMGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxUGx3FSYXAcJxX/H7M83vWXjS37AAAAAElFTkSuQmCC' ),
  new MipmapElement( 110, 83, 'data:image/png;base64,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' ),
  new MipmapElement( 55, 42, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAARcSURBVO3BfWjUdRzA8ff3+/v9ttvc3DzP7TYfpvgwzYfCB9QiTSQfluRCy1IoBLVIofqj/kgoCzHsDzEzQlH6oyaoBJFWRgipzay5sJzkbOa8PeWm7uFuu9vd7/f7hH+YpLtzDNqOuNeLlJSUlJSUlIExf968jaFQSNFHmiTVUNdk2hJZcez4kWH0kUGSiqpQybhVwTcrTlTV/nampoI+0CSp6sazk3PzM5lVvPAX+kiTpHJHZuQZyux+dNbjVdxlzbtzdq3buuxp7kPRjxZOnvDJtLzskSLEpbRWSmsdelD5R5f4Rt94r+VHAcU/RBrGdc/MeWBw9bbVX8zx+YY6xGHSj67WN87NsHOKpxb6MA1FzxxucUyLaGs3mXQv4C7ZgRgyPjbz7ZVL9wDriEPTzy5eaeD4xQAdkSiJGENMnJBDT5SlsDwGmcRKrgTqLOLQDICbN1r5uvISV28GEXpm1sawK0LcQ0CmZeDpEtK1W1C256O5xKEZIOLYlFddpqL2GjHb5W7pNTZmdZS7tYwU8md6yTgTId0yuHD6xAzi0AwgBVwONPHthVpau7pJxHWFG1MM/KsLcU+2441aOK4w+eH554hDkwSC7R0cq6ympqUdEf5NoD3XxX7By/DSAqJHb+Cv0RhaEXZU6IlnVv9EHAb9yOtJ24Qd9dEjofF6Gx22kJ+dyS3BSSZpT3kpeNJPrCWKcaCV/DYLU2uijkOgIxJ4cfM7O4jDJMkEGq9xvaOT8QsKmbAwD93mEvywkcKghWWkowwI2w4toQjKMOtIwCQJdYVCnDtyCW8dzC7Kx9QZ6HSF6wph26Y5FMYVoRvrDxLQ9COV5gnRSwo49XsArRSWoRER2iNRmoMRFArHdWnoilwhAU0/GjKq6FVyfJfpJbs7Qn1bJ+2RKNeCYcIxG9NQiAhhx8Vfmj2dBDT96OfKyh9GTJr0rDFseDW9dL0zTCRmYxkKrRQi4AqEM118Iwb5SUDTz74/eers/CVLSq2Cogv0Qk5GOlorREAAEcEVwckz0IYySUAzAPbu339x1dq1y6yCol9JwAUyLYNbBBARBHBFUIVpiOu0koBmgGzZsqX2tc2blxrDhp8Veqa1QbplcpsArggRxyG7eBDtgbTvSEAzgDZs2NC0c9++RdrrLxfulTM4C0trRAQREAER6Jxuke0dFHhrzd7dJGAwwMrKyiIV589/duDg4UfcruAYxR2j/T7G+nIQBFcEV6B5cIyhy/Ocjia9dc3ijeUkoEkCY8eMiZ4+X7UoY9TYb4Q7hgzyIAi3NWfFyH3ej8ZzcPfLx3ZwHwZJ4v3t26Xur2tlnx76/KHumy0TFTBpZD6+LA+2C/XFgm+1X0zDc3hLyZfP0QuKJDR96tRD7dXnV5bOnqI8ozw4i7MZWjy4s7Xe+XjbiqOv00sGSaipufnwqPETx1mPWVPGrS8SKyu94s9y+42d67/6gP+L5a/M2PXSjqWbSElJSUn5D/0NpvjCXXawyWcAAAAASUVORK5CYII=' ),
  new MipmapElement( 28, 21, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAH9SURBVO3BO2gTYQAH8P/3fXe5puklMU0KtVhqBqWNryIqJIiPIkJ9ZNDFoYtDcHBQqi6iUJBsUh2t0E2KxSUWqgiCL4xUaVUUKhajtjQll1Zr65nLPT5ROxw3dLgEp/x+qKmxS+zedfZOZsiHVVBU0d7zgWMPsyPbsQoCF7piG45vjjTsgA1hAvGdWpNUb3y/C3AstBlRcZP8/OaZx1dhw+AC1Uq9HspPr/VLCS9DQqI84SFmQl9HG72TatwDM86WjXYESGz41otr1/v7OVYwuBCSPEmlUOxUSjoicj0kgeGveQNU5fijvNMLecbwj2YePZ2Y/JjDCooKKIUF3Hs9helvy+AcYIoFQ+DQu2UERRH1BWJGY1tzsKGokKlpePZ2ChNfC1jcJqDuRBiRHEfTG44lzVQuXkl/go0AF4ggGnD48HkWP26XcXK6A5ZFMPerBFU38nCgcCHUFk2TQOMrOOTnisgvqphXNeimhdJGIQgHChfGxse/7Dua7Gbh5ixsOABGCQgA0+LgLSKDA4VLA4ODSm9f30ESDD/h+EeU6iAJDBaAkszhi/rew4GiAqlUaun+2Mv9LNT0gANoDvsBcJSpBXo4WNR/Smk4EFRJR2vrSHsDDnV2tZDyHnlWDHjPXTqQGYIDQRUdSW0ZjvesF3JZ/fLAhdF3qPkffgPIobBhe1ABXQAAAABJRU5ErkJggg==' ),
  new MipmapElement( 14, 11, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAADoSURBVGOgO2BmIAIULHAqNda0fn76yKUPDFDAyIADaIuLxNgqiRYJcbEz/LfjFmA8/O3DRyXG3yU1GywU5eT+MzPgALzMDC5PX3+IF+TllOR7xyD4X4JZkouLRWrv5lMrTl+++paJAQdgZGL+/+vbd4aD528zXPjxnkFSlJuB486/99OWrbrJAARMDDiAsJLqfEZewUMMQHD98EOGb9e/M3wQ/sfEAAVMDDjAqXPnPpR2droy8PDv4ebjYWBiZmRg0OS4yQAFzAx4wObNm/+++/FzsZGxjKlEqNgrDl3BrP2Lb75kGBAAAF+NSb69LL2BAAAAAElFTkSuQmCC' )
];

export default mipmaps;