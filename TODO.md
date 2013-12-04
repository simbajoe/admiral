Features
=======
- show where_could_move (client side)
- show last turn (client side)
- show whereGroupUnits (can be found in Config)
- Add confirmation to start game after planning phase
- When placing units mark active in list
- Show difference between support phase and battle results

Bugs
=======
- Skip phase if no units can move? or loose?
- was_in_battle:
  try attack strong unit by week unit and lose
  on the next move phase strong unit will be with golden border
  because it was in the last battle, but it's not view results phase
- previousLocation:
  try to move and skip attack
  moving steps should stay but it is wrong
