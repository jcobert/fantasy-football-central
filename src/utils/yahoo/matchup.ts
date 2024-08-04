import {
  Grade,
  Matchup,
  MatchupStatus,
  PlayoffSettings,
  Team,
} from './types/common'
import { groupBy, round, sortBy, uniqBy } from 'lodash'

export const getWinsByOpponent = () => {}

export const determineWinningestTeam = () => {}

export const gradeAsGpa = (grade?: Grade): number | undefined => {
  switch (grade) {
    case Grade.APlus:
      return 4.0
    case Grade.A:
      return 3.67
    case Grade.AMinus:
      return 3.33
    case Grade.BPlus:
      return 3.0
    case Grade.B:
      return 2.67
    case Grade.BMinus:
      return 2.33
    case Grade.CPlus:
      return 2.0
    case Grade.C:
      return 1.67
    case Grade.CMinus:
      return 1.33
    case Grade.DPlus:
      return 1
    case Grade.D:
      return 0.67
    case Grade.DMinus:
      return 0.33
    case Grade.F:
      return 0
    default:
      break
  }
}

export const getAverageMatchupGrade = (
  matchups?: Team['matchups'],
  teamKey?: Team['teamKey'],
) => {
  const pastMatchups = matchups?.matchup?.filter(
    (matchup) => matchup?.status === MatchupStatus.Postevent,
  )

  const grades = pastMatchups?.map((matchup) =>
    gradeAsGpa(
      matchup?.matchupGrades?.matchupGrade?.find(
        (grade) => grade?.teamKey === teamKey,
      )?.grade,
    ),
  )

  const average = (grades as number[])?.reduce(
    (total, grade) => total + grade,
    0,
  )

  if (!grades?.length || average === undefined) return undefined
  const gpa = average / grades?.length
  return round(gpa, 2)
}

export const getPreviousMatchup = (matchups: Matchup[] = []) => {
  if (!matchups?.length) return undefined
  const pastMatchups = sortBy(
    matchups?.filter((matchup) => matchup?.status === MatchupStatus.Postevent),
    (m) => m?.week,
  )?.reverse()
  if (!pastMatchups?.length) return undefined
  return pastMatchups[0]
}

export type PlayoffRound = 'quarterfinal' | 'semifinal' | 'final'

export type PlayoffMatchup = Matchup & {
  round?: PlayoffRound
  roundTitle?: string
  winnerPlace?: number
}

export type PlayoffBrackets = {
  championship: PlayoffMatchup[]
  consolation: PlayoffMatchup[]
}

export const getPlayoffMatchups = (
  matchups: Matchup[] = [],
  settings: PlayoffSettings,
) => {
  const playoffMatchupsByWeek = groupBy(
    matchups?.filter((m) => m?.isPlayoffs),
    (pm) => pm?.week,
  )

  const playoffMatchups = Object.keys(playoffMatchupsByWeek)?.flatMap((week) =>
    uniqBy(
      playoffMatchupsByWeek[week],
      (pm) => sortBy(pm?.teams?.team?.map((t) => t?.teamId))?.[0],
    ),
  )

  const allPlayoffMatchups = playoffMatchups?.map((pm) => {
    const round = getPlayoffRound(pm?.week, settings)
    let winnerPlace
    if (round === 'final') {
      if (
        pm?.teams?.team?.some(
          (t) =>
            playoffMatchups
              ?.filter((match) => match?.week === pm?.week - 1)
              ?.map((m) => m?.winnerTeamKey)
              ?.includes(t?.teamKey),
        )
      ) {
        if (pm?.isConsolation) {
          winnerPlace = 5
        } else winnerPlace = 1
      } else {
        if (pm?.isConsolation) {
          winnerPlace = 7
        } else winnerPlace = 3
      }
    }
    return { ...pm, round, winnerPlace } as PlayoffMatchup
  })

  return groupBy(allPlayoffMatchups, (pm) =>
    pm?.isConsolation ? 'consolation' : 'championship',
  ) as PlayoffBrackets
}

export const getPlayoffRound = (
  currentWeek: number,
  settings: PlayoffSettings,
) => {
  const { endWeek, hasMultiweekChampionship } = settings ?? {}
  const relativeWeek =
    endWeek - currentWeek + (hasMultiweekChampionship ? 0 : 1)

  let round: PlayoffRound
  switch (relativeWeek) {
    case 1:
      round = 'final'
      break
    case 2:
      round = 'semifinal'
      break
    case 3:
      round = 'quarterfinal'
      break
    default:
      round = 'semifinal'
      break
  }
  return round
}

export const getPlayoffDuration = (settings: PlayoffSettings) => {
  return settings?.endWeek - settings?.playoffStartWeek + 1
}

export const getPlayoffRoundTitle = (roundWinnerPlace?: number) => {
  let title = ''
  switch (roundWinnerPlace) {
    case 1:
      title = 'Championship Final'
      break
    case 3:
      title = '3rd Place Game'
      break
    case 5:
      title = '5th Place Game'
      break
    case 7:
      title = '7th Place Game'
      break
    default:
      break
  }
  return title
}
