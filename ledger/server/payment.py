import csv
from io import StringIO
from dataclasses import dataclass, asdict

@dataclass
class Payment:
    docNo: str
    date: str
    amount: str
    currency: str
    note: str

    account: str
    companyRegistry: str
    bankCode: str

    agent: str
    agentAccount: str
    agentCompanyRegistry: str
    agentBank: str
    agentBankCode: str

    @classmethod
    def create(cls, values):
        record = cls(**values)
        return asdict(record)

def get_payments_from_csv(stream):
    fields_mapping = {
        'Номер документа': 'docNo',
        'Дата операции': 'date',
        'Сумма': 'amount',
        'Валюта': 'currency',
        'Назначение платежа': 'note',

        'Счет' : 'account',
        'ЕГРПОУ': 'companyRegistry',
        'МФО': 'bankCode',

        'Корреспондент': 'agent',
        'Счет корреспондента': 'agentAccount',
        'ЕГРПОУ корреспондента': 'agentCompanyRegistry',
        'Название банка': 'agentBank',
        'МФО банка': 'agentBankCode',
    }

    text_stream = StringIO(stream.decode('cp1251'))
    reader = csv.DictReader(text_stream, delimiter=';', quotechar='"')
    return [
        Payment.create({fields_mapping[k]: v for k, v in row.items() if k in fields_mapping})
        for row in reader
    ]
