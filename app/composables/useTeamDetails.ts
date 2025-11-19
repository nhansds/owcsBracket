import { ref } from 'vue'
import type { Team } from '~/types/bracket'

export const useTeamDetails = () => {
  const activeTeam = useState<Team | null>('active-team', () => null)

  const setActiveTeam = (team: Team | null) => {
    activeTeam.value = team
  }

  return {
    activeTeam,
    setActiveTeam
  }
}

