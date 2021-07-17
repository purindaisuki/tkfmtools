import {
  ISkill,
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
} from "types/skills";
import { BattleCharacter as Character } from "types/battle";
import { CharacterAttribute } from "types/characters";

export function calcAttack(character: Character) {
  let ATKEffectPercentage = 1;
  let ATKEffectValue = 0;

  character.effects.forEach((s) => {
    if (s.type === SkillEffectType.ATTACK_POWER && s.value !== undefined) {
      if (s.basis === SkillEffectBasis.SELF_ATK) {
        ATKEffectValue += s.value;
      } else if (s.basis === SkillEffectBasis.TARGET_ATK) {
        const stack = s.stack ? s.stack : 1;
        // check the condition of conditional skill
        if (
          !(
            (s.otherConditionValue &&
              s.otherCondition === SkillCondition.HP_GREATER_THAN &&
              character.HP / character.maxHP < s.otherConditionValue) ||
            (s.otherConditionValue &&
              s.otherCondition === SkillCondition.HP_LESS_THAN &&
              character.HP / character.maxHP >= s.otherConditionValue)
          )
        ) {
          ATKEffectPercentage += s.value * stack;
        }
      }
    }
  });

  return Math.floor(character.baseATK * ATKEffectPercentage) + ATKEffectValue;
}

/**
 * A chart describing the damage rate among attributes
 * rate = ATTRIBUTE_CHART[from][to]
 */
const ATTRIBUTE_CHART = [
  [1, 0.75, 1.5, 1, 1],
  [1.5, 1, 0.75, 1, 1],
  [0.75, 1.5, 1, 1, 1],
  [1, 1, 1, 1, 1.5],
  [1, 1, 1, 1.5, 1],
];

export function calcDamage(
  from: Character,
  to: Character,
  action: ISkill | SkillEffect
) {
  if (
    !action.value ||
    !(
      action.type === SkillActionType.COUNTER_STRIKE ||
      action.type === SkillActionType.NORMAL_ATTACK ||
      action.type === SkillActionType.ULTIMATE ||
      action.type === SkillActionType.FOLLOW_UP_ATTACK ||
      action.type === SkillActionType.REAL_ATTACK
    )
  ) {
    throw "invalid argument: wrong skill type";
  }

  let dealtDamageEffect = 1;
  let attackDamageEffect = 1;
  let attributeEffect =
    from.attribute === CharacterAttribute.NONE ||
    to.attribute === CharacterAttribute.NONE ||
    action.on === SkillOn.TURN_END ||
    action.type === SkillActionType.REAL_ATTACK
      ? 1
      : ATTRIBUTE_CHART[from.attribute][to.attribute];
  let guardEffect = to.isGuard ? 0.5 : 1;
  let breakEffect = to.isBroken ? 1.25 : 1;
  let damagedEffect = 1;
  let attributeDamagedEffect = 1;

  if (action.basis === SkillEffectBasis.TARGET_CURRENT_HP) {
    return Math.floor(to.HP * action.value);
  }

  if (action.basis === SkillEffectBasis.TARGET_MAX_HP) {
    return Math.floor(to.maxHP * action.value);
  }

  from.effects.forEach((s) => {
    // exclude dot
    if (
      action.on === SkillOn.TURN_END ||
      action.type === SkillActionType.REAL_ATTACK ||
      s.value === undefined
    ) {
      return true;
    }

    if (
      (s.otherConditionValue &&
        s.otherCondition === SkillCondition.HP_GREATER_THAN &&
        from.HP / from.maxHP < s.otherConditionValue) ||
      (s.otherConditionValue &&
        s.otherCondition === SkillCondition.HP_LESS_THAN &&
        from.HP / from.maxHP >= s.otherConditionValue)
    ) {
      return true;
    }

    const stack = s.stack ? s.stack : 1;

    switch (s.type) {
      case SkillEffectType.ATTRIBUTE_EFFECT:
        attributeEffect = 1 + (attributeEffect - 1) * (1 + s.value * stack);
        break;
      case SkillEffectType.DEALT_DAMAGE:
        dealtDamageEffect += s.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGE:
        if (action.type === SkillActionType.NORMAL_ATTACK) {
          attackDamageEffect += s.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGE:
        if (
          action.type === SkillActionType.ULTIMATE ||
          action.type === SkillActionType.FOLLOW_UP_ATTACK
        ) {
          attackDamageEffect += s.value * stack;
        }
        break;
    }

    return true;
  });

  to.effects.forEach((s) => {
    if (s.value === undefined || action.type === SkillActionType.REAL_ATTACK) {
      return true;
    }

    if (
      (s.otherConditionValue &&
        s.otherCondition === SkillCondition.HP_GREATER_THAN &&
        from.HP / from.maxHP < s.otherConditionValue) ||
      (s.otherConditionValue &&
        s.otherCondition === SkillCondition.HP_LESS_THAN &&
        from.HP / from.maxHP >= s.otherConditionValue)
    ) {
      return true;
    }
    const stack = s.stack ? s.stack : 1;

    switch (s.type) {
      case SkillEffectType.ATTRIBUTE_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          s.byAttribute === from.attribute
        ) {
          attributeDamagedEffect += s.value * stack;
        }
        break;
      case SkillEffectType.ATTRIBUTE_EFFECT:
        if (action.on !== SkillOn.TURN_END) {
          attributeEffect = 1 + (attributeEffect - 1) * (1 + s.value * stack);
        }
        break;
      case SkillEffectType.DAMAGED:
        damagedEffect += s.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          action.type === SkillActionType.NORMAL_ATTACK
        ) {
          attackDamageEffect += s.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          (action.type === SkillActionType.ULTIMATE ||
            action.type === SkillActionType.FOLLOW_UP_ATTACK)
        ) {
          attackDamageEffect += s.value * stack;
        }
        break;
      case SkillEffectType.GUARD_EFFECT:
        if (to.isGuard) {
          guardEffect -= s.value * stack;
        }
        break;
    }

    return true;
  });

  return Math.floor(
    (action.on === SkillOn.TURN_END &&
    action.basis === SkillEffectBasis.SELF_ATK
      ? 1
      : from.ATK) *
      dealtDamageEffect *
      attackDamageEffect *
      attributeEffect *
      guardEffect *
      breakEffect *
      damagedEffect *
      attributeDamagedEffect *
      action.value
  );
}

export function calcHeal(
  from: Character,
  to: Character,
  action: ISkill | SkillEffect,
  damage?: number
) {
  if (!action.value || action.type !== SkillActionType.HEAL) {
    throw "invalid argument";
  }

  let base: number;
  let healEffect = 1;
  let healedEffect = 1;
  let damageEffect = 1;

  if (action.on === SkillOn.TURN_END) {
    base = 1;
  } else {
    switch (action.basis) {
      case SkillEffectBasis.SELF_ATK:
        base = from.ATK;
        break;
      case SkillEffectBasis.TARGET_ATK:
        base = to.ATK;
        break;
      case SkillEffectBasis.TARGET_MAX_HP:
        base = to.maxHP;
        break;
      case SkillEffectBasis.TARGET_CURRENT_HP:
        base = to.HP;
        break;
      case SkillEffectBasis.DAMAGE:
        if (damage === undefined) {
          throw "invalid argument";
        }

        return Math.floor(damage * action.value);
      default:
        throw "invalid argument";
    }
  }

  from.effects.forEach((s): boolean | void => {
    if (action.on === SkillOn.TURN_END || s.value === undefined) {
      return true;
    }

    const stack = s.stack ? s.stack : 1;

    switch (s.type) {
      case SkillEffectType.HEAL_EFFECT:
        healEffect += s.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGE:
        if (action.type === SkillActionType.NORMAL_ATTACK) {
          damageEffect += s.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGE:
        if (action.type === SkillActionType.ULTIMATE) {
          damageEffect += s.value * stack;
        }
        break;
    }
  });

  to.effects.forEach((s) => {
    if (s.value !== undefined && s.type === SkillEffectType.HEALED) {
      const stack = s.stack ? s.stack : 1;
      healedEffect += s.value * stack;
    }
  });

  return Math.floor(
    base * healEffect * healedEffect * damageEffect * action.value
  );
}

export function calcShield(
  from: Character,
  to: Character,
  action: ISkill | SkillEffect
) {
  if (!action.value || action.type !== SkillActionType.SHIELD) {
    throw "invalid argument";
  }

  let base: number;
  let shieldEffect = 1;
  let shieldedEffect = 1;
  let damageEffect = 1;

  switch (action.basis) {
    case SkillEffectBasis.SELF_ATK:
      base = from.ATK;
      break;
    case SkillEffectBasis.TARGET_ATK:
      base = to.ATK;
      break;
    case SkillEffectBasis.TARGET_MAX_HP:
      base = to.maxHP;
      break;
    default:
      throw "invalid argument";
  }

  from.effects.forEach((s) => {
    if (s.value !== undefined) {
      const stack = s.stack ? s.stack : 1;

      switch (s.type) {
        case SkillEffectType.SHIELD_EFFECT:
          shieldEffect += s.value * stack;
          break;
        case SkillEffectType.NORMAL_ATTACK_DAMAGE:
          if (action.type === SkillActionType.NORMAL_ATTACK) {
            damageEffect += s.value * stack;
          }
          break;
        case SkillEffectType.ULTIMATE_DAMAGE:
          if (action.type === SkillActionType.ULTIMATE) {
            damageEffect += s.value * stack;
          }
          break;
      }
    }
  });

  to.effects.forEach((s) => {
    if (s.value !== undefined && s.type === SkillEffectType.SHIELDED) {
      const stack = s.stack ? s.stack : 1;
      shieldedEffect += s.value * stack;
    }
  });

  return Math.floor(
    base * shieldEffect * shieldedEffect * damageEffect * action.value
  );
}
