import csv
import datetime
from io import StringIO
from dataclasses import dataclass, asdict

FIELDS_MAPPING = {
    'ЕГРПОУ': 'companyRegistry',
    'МФО': 'bankCode',
    'Счет': 'account',
    'Валюта': 'currency',
    'Номер документа': 'docNo',
    'Дата операции': 'date',
    'МФО банка': 'agentBankCode',
    'Название банка': 'agentBank',
    'Счет корреспондента': 'agentAccount',
    'ЕГРПОУ корреспондента': 'agentCompanyRegistry',
    'Корреспондент': 'agent',
    'Сумма': 'amount',
    'Назначение платежа': 'note',
}

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
    def load_from_csv(cls, values):
        return cls(**{FIELDS_MAPPING[k]: v for k, v in values.items() if k in FIELDS_MAPPING})

    @classmethod
    def load_from_json(cls, values):
        payment_fields = FIELDS_MAPPING.values()
        return cls(**{k: v for k, v in values.items() if k in payment_fields})

    @classmethod
    def sort_by_date(cls, payments):
        return sorted(payments, key=lambda x: datetime.datetime.strptime(x.date, '%d.%m.%Y'))

    def dump_as_csv_row(self):
        rmapping = {v: k for k, v in FIELDS_MAPPING.items()}
        return {rmapping[k]: v for k, v in asdict(self).items() if k in rmapping}

    def dump_as_json(self):
        return asdict(self)

def get_payments_info_from_csv(stream):
    try:
        decoded_data = stream.decode('cp1251')
    except UnicodeDecodeError:
        decoded_data = stream.decode('utf-8')

    text_stream = StringIO(decoded_data)
    reader = csv.DictReader(text_stream, delimiter=';', quotechar='"')
    return [Payment.load_from_csv(row).dump_as_json() for row in reader]

def save_payments_to_csv(payments_info):
    payments = [Payment.load_from_json(x) for x in payments_info]

    with StringIO() as text_stream:
        writer = csv.DictWriter(text_stream, FIELDS_MAPPING.keys(), delimiter=';', quotechar='"')

        writer.writeheader()
        for payment in Payment.sort_by_date(payments):
            writer.writerow(payment.dump_as_csv_row())

        text_stream.seek(0)
        data = text_stream.read()

    return data
