#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Address, Vec, Symbol};

#[contracttype]
pub struct Remesa {
    pub sender: Address,
    pub receiver: Address,
    pub amount: i128,
    pub timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    History(Address),
    Score(Address),
}

#[contract]
pub struct ScoreContract;

#[contractimpl]
impl ScoreContract {

    // Registra una remesa y actualiza el score del receptor
    pub fn register_remesa(
        env: Env,
        sender: Address,
        receiver: Address,
        amount: i128,
    ) {
        sender.require_auth();

        let remesa = Remesa {
            sender: sender.clone(),
            receiver: receiver.clone(),
            amount,
            timestamp: env.ledger().timestamp(),
        };

        // Guardar en historial del receptor
        let key = DataKey::History(receiver.clone());
        let mut history: Vec<Remesa> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or(Vec::new(&env));

        history.push_back(remesa);
        env.storage().persistent().set(&key, &history);

        // Actualizar score
        Self::update_score(env, receiver);
    }

    // Calcula y guarda el score del receptor
    fn update_score(env: Env, receiver: Address) {
        let key = DataKey::History(receiver.clone());
        let history: Vec<Remesa> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or(Vec::new(&env));

        let count = history.len() as i128;
        let mut total: i128 = 0;

        for i in 0..history.len() {
            total += history.get(i).unwrap().amount;
        }

        // Score simple: consistencia (num envíos * 10) + promedio de monto / 100
        let score = (count * 10) + (if count > 0 { total / count / 100 } else { 0 });
        let capped_score = if score > 100 { 100i128 } else { score };

        let score_key = DataKey::Score(receiver);
        env.storage().persistent().set(&score_key, &capped_score);
    }

    // Obtener score del receptor
    pub fn get_score(env: Env, receiver: Address) -> i128 {
        let key = DataKey::Score(receiver);
        env.storage().persistent().get(&key).unwrap_or(0)
    }

    // Obtener número de remesas recibidas
    pub fn get_remesa_count(env: Env, receiver: Address) -> u32 {
        let key = DataKey::History(receiver);
        let history: Vec<Remesa> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or(Vec::new(&env));
        history.len()
    }
}